import { useEffect, useState } from 'react';
import { ColorPalette } from './palette';

/**
 * Every knob that changes how the dithered image looks.
 * Shared by processIkedaImage() and <IkedaImage>. All fields are optional.
 *
 * What happens to the image, in order:
 * 1. resize to `targetWidth`
 * 2. add `brightnessAdjust`
 * 3. scale `contrastBoost` around mid gray
 * 4. flip light/dark if `invert`
 * 5. convert to grayscale
 * 6. pick the 3 cut points between the 4 gray levels (from `colorDistribution`, or `colorThresholds`)
 * 7. dither down to 4 levels with `ditherMethod`
 * 8. paint the levels: black (made transparent), palette.color1, color2, color3
 *
 * Gray level to color: darkest = transparent, then color1, color2, and brightest = color3.
 */
export interface IkedaOptions {
	/**
	 * How the gray image is squeezed down to 4 levels.
	 * - `'atkinson'`: crisp, high contrast. Throws away detail in the very darkest and lightest areas. Looks like old Mac graphics.
	 * - `'floyd-steinberg'`: smoothest and closest to the photo. Also the noisiest.
	 * - `'ordered'`: a regular grid pattern. Cleanest and most "designed" look. Hides fine detail.
	 *
	 * @default 'floyd-steinberg' in processIkedaImage(), 'atkinson' in <IkedaImage>
	 */
	ditherMethod?: 'floyd-steinberg' | 'atkinson' | 'ordered';

	/**
	 * Contrast multiplier around mid gray. 1 = no change, below 1 = flatter, above 1 = harsher.
	 * Sensible range is 0.5 to 3. Above about 3 most pixels hit pure black or white and the dither has nothing to work with.
	 *
	 * @default 1.5
	 */
	contrastBoost?: number;

	/**
	 * Amount added to every pixel's red, green and blue (0 to 255 scale) before contrast.
	 * Negative = darker, positive = brighter. Sensible range is -80 to 80.
	 * Runs before `contrastBoost`, so a dark shift plus high contrast crushes shadows to black.
	 * With `useHistogram` on, the later steps re-balance anyway, so this matters less than you'd think.
	 *
	 * @default 0
	 */
	brightnessAdjust?: number;

	/**
	 * Color saturation. 0 = grayscale, 1 = unchanged, above 1 = more vivid.
	 * HACK: the image goes to grayscale a few steps later, so this has almost no visible effect.
	 * It's kept so old pages that pass it still compile.
	 *
	 * @default 1
	 */
	saturation?: number;

	/**
	 * The 3 gray values (0 to 255, ascending) that split the image into 4 levels:
	 * `[black -> color1, color1 -> color2, color2 -> color3]`.
	 * Lower numbers = more of the image lands in the brighter colors.
	 * Only used when `useHistogram` is false. Otherwise it is ignored.
	 *
	 * @default [64, 128, 192]
	 */
	colorThresholds?: [number, number, number];

	/**
	 * Flip light and dark before dithering.
	 * - `false`: dark parts of the source become transparent, bright parts become color3.
	 * - `true`: bright parts of the source become transparent, dark parts become color3.
	 * Black is always the transparent level, so this picks which part of your photo shows up as dots.
	 * Try both. Photos with a dark background usually want `false`. Light backgrounds want `true`.
	 *
	 * @default false in processIkedaImage(), true in <IkedaImage>
	 */
	invert?: boolean;

	/**
	 * Pick the cut points from the image itself, so `colorDistribution` is hit no matter how dark or light the photo is.
	 * Set false to use fixed `colorThresholds` instead.
	 *
	 * @default true
	 */
	useHistogram?: boolean;

	/**
	 * Target share of pixels for each level, in percent: `[black (transparent), color1, color2, color3]`.
	 * Should add up to 100. Only used when `useHistogram` is true.
	 * More black = airier, more see-through. More color3 = denser and brighter.
	 * Only the first three numbers set the cut points. The fourth is whatever is left.
	 * The dither moves the real result a few percent off target. Turn on `showDebug` to see the actual split.
	 *
	 * @default [40, 25, 20, 15]
	 */
	colorDistribution?: [number, number, number, number];

	/**
	 * Resize to this width in pixels (height follows the aspect ratio) BEFORE dithering.
	 * This sets the dot size. The result is shown with `image-rendering: pixelated`, so small = chunky dots, large = fine grain.
	 * Sensible range is 200 to 1200. Existing pages use 600.
	 * Leave it out to use the source's own size. That is slow on big photos and makes tiny dots.
	 */
	targetWidth?: number;
}

/**
 * Turns an image into a dithered, high-contrast, 3-color picture on a transparent background.
 * Inspired by Ryoji Ikeda's look.
 *
 * Runs in the browser only (it uses a canvas). The image has to be same-origin or served with CORS headers.
 * Call it from a client component or an effect, not from a server component.
 *
 * @param imageUrl - URL or path to the source image, e.g. `/blog/beamhalo/hero.png`
 * @param palette - Three colors, from dimmest to brightest (color1, color2, color3). Hex, 8-digit hex (alpha is dropped) or `rgb(r, g, b)`. Anything else turns black.
 * @param options - See {@link IkedaOptions}
 * @returns a PNG data URL, plus `debugInfo` with the cut points and the real share of pixels per color
 */
export async function processIkedaImage(
	imageUrl: string,
	palette: ColorPalette,
	options: IkedaOptions = {}
): Promise<{
	dataUrl: string;
	debugInfo: {
		/** The 3 gray cut points that were actually used (0 to 255). */
		thresholds: [number, number, number];
		/** Pixel count per level: [black, color1, color2, color3]. */
		colorCounts: [number, number, number, number];
		totalPixels: number;
		/** Same as colorCounts, in percent. Compare with `colorDistribution` to see how close the dither got. */
		colorPercentages: [number, number, number, number];
	};
}> {
	const {
		ditherMethod = 'floyd-steinberg',
		contrastBoost = 1.5,
		brightnessAdjust = 0,
		saturation = 1.0,
		colorThresholds = [64, 128, 192],
		invert = false,
		useHistogram = true,
		colorDistribution = [40, 25, 20, 15], // black, color1, color2, color3
		targetWidth,
	} = options;

	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		
		img.onload = () => {
			try {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d', { willReadFrequently: true });
				
				if (!ctx) {
					reject(new Error('Could not get canvas context'));
					return;
				}

				// Calculate dimensions based on targetWidth
				let width = img.width;
				let height = img.height;
				
				if (targetWidth && width !== targetWidth) {
					const aspectRatio = height / width;
					width = targetWidth;
					height = Math.round(targetWidth * aspectRatio);
				}

				canvas.width = width;
				canvas.height = height;

				// Draw original image (scaled if targetWidth specified)
				ctx.drawImage(img, 0, 0, width, height);
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const data = imageData.data;

				// Step 1: Adjust brightness and saturation
				for (let i = 0; i < data.length; i += 4) {
					// Apply brightness adjustment
					for (let j = 0; j < 3; j++) {
						data[i + j] = Math.max(0, Math.min(255, data[i + j] + brightnessAdjust));
					}
					
					// Apply saturation adjustment
					const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
					for (let j = 0; j < 3; j++) {
						data[i + j] = gray + saturation * (data[i + j] - gray);
					}
				}

				// Step 2: Boost contrast
				for (let i = 0; i < data.length; i += 4) {
					// Apply contrast boost
					for (let j = 0; j < 3; j++) {
						const contrasted = ((data[i + j] / 255 - 0.5) * contrastBoost + 0.5) * 255;
						data[i + j] = Math.max(0, Math.min(255, contrasted));
					}
				}

				// Step 2.5: Invert if requested (for dots-on-black effect)
				if (invert) {
					for (let i = 0; i < data.length; i += 4) {
						for (let j = 0; j < 3; j++) {
							data[i + j] = 255 - data[i + j];
						}
					}
				}

				// Step 3: Convert to grayscale
				for (let i = 0; i < data.length; i += 4) {
					const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
					data[i] = data[i + 1] = data[i + 2] = gray;
				}

				// Step 4: Calculate thresholds from histogram
				let finalThresholds = colorThresholds;
				if (useHistogram) {
					finalThresholds = calculateHistogramThresholds(data, colorDistribution);
				}

				// Step 4.5: Remap pixel values so histogram thresholds align with dither levels.
				// Without this, colorDistribution has no effect — the thresholds were computed but
				// never applied. This stretches/compresses tonal ranges so the dithering will
				// distribute colors according to the desired proportions.
				const [t0, t1, t2] = finalThresholds;
				const ditherLevels: [number, number, number, number] = [0, 85, 170, 255];
				// Map thresholds to midpoints between dither levels (the quantizer decision boundaries).
				// This ensures t0 pixels are 50/50 black/color1, t1 are 50/50 color1/color2, etc.
				const mid0 = 42, mid1 = 128, mid2 = 213;
				const lut = new Uint8Array(256);
				for (let v = 0; v < 256; v++) {
					let remapped: number;
					if (v <= t0) {
						remapped = t0 === 0 ? 0 : (v / t0) * mid0;
					} else if (v <= t1) {
						remapped = mid0 + ((v - t0) / (t1 - t0 || 1)) * (mid1 - mid0);
					} else if (v <= t2) {
						remapped = mid1 + ((v - t1) / (t2 - t1 || 1)) * (mid2 - mid1);
					} else {
						remapped = t2 === 255 ? 255 : mid2 + ((v - t2) / (255 - t2 || 1)) * (255 - mid2);
					}
					lut[v] = Math.max(0, Math.min(255, Math.round(remapped)));
				}
				for (let i = 0; i < data.length; i += 4) {
					const mapped = lut[data[i]];
					data[i] = data[i + 1] = data[i + 2] = mapped;
				}

				// Step 5: Apply dithering with 4-level quantization
				if (ditherMethod === 'floyd-steinberg') {
					multiLevelFloydSteinberg(data, canvas.width, canvas.height, ditherLevels);
				} else if (ditherMethod === 'atkinson') {
					multiLevelAtkinson(data, canvas.width, canvas.height, ditherLevels);
				} else {
					multiLevelOrdered(data, canvas.width, canvas.height, ditherLevels);
				}

				// Step 6: Map quantized levels to actual colors
				const paletteColors = [
					{ r: 0, g: 0, b: 0 }, // Black
					hexToRgb(palette.color1),
					hexToRgb(palette.color2),
					hexToRgb(palette.color3),
				];

				const colorCounts: [number, number, number, number] = [0, 0, 0, 0];
				const totalPixels = data.length / 4;

				for (let i = 0; i < data.length; i += 4) {
					const gray = data[i];
					let colorIndex: number;
					
					// Map from quantized levels to color indices
					if (gray <= 10) {
						colorIndex = 0; // Black (level 0)
					} else if (gray <= 95) {
						colorIndex = 1; // Color 1 (level 85)
					} else if (gray <= 180) {
						colorIndex = 2; // Color 2 (level 170)
					} else {
						colorIndex = 3; // Color 3 (level 255)
					}

					colorCounts[colorIndex]++;

					const color = paletteColors[colorIndex];
					data[i] = color.r;
					data[i + 1] = color.g;
					data[i + 2] = color.b;
					// black level is the backdrop. Make it transparent so the page shows through.
					if (colorIndex === 0) data[i + 3] = 0;
				}

				ctx.putImageData(imageData, 0, 0);
				
				const colorPercentages: [number, number, number, number] = [
					(colorCounts[0] / totalPixels) * 100,
					(colorCounts[1] / totalPixels) * 100,
					(colorCounts[2] / totalPixels) * 100,
					(colorCounts[3] / totalPixels) * 100,
				];

				resolve({
					dataUrl: canvas.toDataURL(),
					debugInfo: {
						thresholds: finalThresholds,
						colorCounts,
						totalPixels,
						colorPercentages,
					},
				});
			} catch (error) {
				reject(error);
			}
		};

		img.onerror = () => reject(new Error('Failed to load image'));
		img.src = imageUrl;
	});
}

/**
 * Multi-level Floyd-Steinberg dithering.
 * Pushes all of each pixel's rounding error onto 4 neighbors. Smooth, photo-like, a bit noisy.
 */
function multiLevelFloydSteinberg(data: Uint8ClampedArray, width: number, height: number, levels: number[]) {
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const i = (y * width + x) * 4;
			const oldPixel = data[i];
			const newPixel = findClosestLevel(oldPixel, levels);
			data[i] = data[i + 1] = data[i + 2] = newPixel;
			
			const error = oldPixel - newPixel;

			// Distribute error to neighboring pixels
			distributeError(data, width, height, x + 1, y, error * 7 / 16);
			distributeError(data, width, height, x - 1, y + 1, error * 3 / 16);
			distributeError(data, width, height, x, y + 1, error * 5 / 16);
			distributeError(data, width, height, x + 1, y + 1, error * 1 / 16);
		}
	}
}

/**
 * Multi-level Atkinson dithering.
 * Pushes only 6/8 of the error onto 6 neighbors. The lost quarter is why it looks crisper and loses detail at the extremes.
 */
function multiLevelAtkinson(data: Uint8ClampedArray, width: number, height: number, levels: number[]) {
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const i = (y * width + x) * 4;
			const oldPixel = data[i];
			const newPixel = findClosestLevel(oldPixel, levels);
			data[i] = data[i + 1] = data[i + 2] = newPixel;
			
			const error = (oldPixel - newPixel) / 8;

			// Atkinson dithering pattern
			distributeError(data, width, height, x + 1, y, error);
			distributeError(data, width, height, x + 2, y, error);
			distributeError(data, width, height, x - 1, y + 1, error);
			distributeError(data, width, height, x, y + 1, error);
			distributeError(data, width, height, x + 1, y + 1, error);
			distributeError(data, width, height, x, y + 2, error);
		}
	}
}

/**
 * Multi-level ordered (Bayer matrix) dithering.
 * Nudges each pixel by a fixed 4x4 pattern (+/- 20 gray levels) before rounding. No error spreading, so it shows a regular grid.
 */
function multiLevelOrdered(data: Uint8ClampedArray, width: number, height: number, levels: number[]) {
	const bayerMatrix = [
		[0, 8, 2, 10],
		[12, 4, 14, 6],
		[3, 11, 1, 9],
		[15, 7, 13, 5]
	];

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const i = (y * width + x) * 4;
			const oldPixel = data[i];
			const threshold = (bayerMatrix[y % 4][x % 4] / 16 - 0.5) * 40;
			const adjustedPixel = oldPixel + threshold;
			const newPixel = findClosestLevel(adjustedPixel, levels);
			data[i] = data[i + 1] = data[i + 2] = newPixel;
		}
	}
}

/**
 * Find the closest level to a given value
 */
function findClosestLevel(value: number, levels: number[]): number {
	let closest = levels[0];
	let minDiff = Math.abs(value - levels[0]);
	
	for (let i = 1; i < levels.length; i++) {
		const diff = Math.abs(value - levels[i]);
		if (diff < minDiff) {
			minDiff = diff;
			closest = levels[i];
		}
	}
	
	return closest;
}

/**
 * Helper to distribute dithering error
 */
function distributeError(
	data: Uint8ClampedArray,
	width: number,
	height: number,
	x: number,
	y: number,
	error: number
) {
	if (x >= 0 && x < width && y >= 0 && y < height) {
		const i = (y * width + x) * 4;
		data[i] = data[i + 1] = data[i + 2] = Math.max(0, Math.min(255, data[i] + error));
	}
}

/**
 * Walk the gray histogram and find the 3 gray values where the running pixel share
 * reaches distribution[0], [0]+[1] and [0]+[1]+[2] percent.
 * Cut points are forced to rise by at least 1, so a flat image can't give two equal ones.
 */
function calculateHistogramThresholds(
	data: Uint8ClampedArray,
	distribution: [number, number, number, number]
): [number, number, number] {
	// Build histogram of grayscale values
	const histogram = new Array(256).fill(0);
	for (let i = 0; i < data.length; i += 4) {
		const gray = data[i];
		histogram[gray]++;
	}

	// Calculate total pixels
	const totalPixels = data.length / 4;

	// Find threshold values based on cumulative distribution
	const [blackPct, color1Pct, color2Pct] = distribution;
	const thresholds: [number, number, number] = [0, 0, 0];
	const targetCounts = [
		(blackPct / 100) * totalPixels,
		((blackPct + color1Pct) / 100) * totalPixels,
		((blackPct + color1Pct + color2Pct) / 100) * totalPixels,
	];

	let cumulative = 0;
	let thresholdIndex = 0;

	for (let i = 0; i < 256 && thresholdIndex < 3; i++) {
		cumulative += histogram[i];
		if (cumulative >= targetCounts[thresholdIndex]) {
			thresholds[thresholdIndex] = i;
			thresholdIndex++;
		}
	}

	// Ensure thresholds are monotonically increasing
	for (let i = 1; i < 3; i++) {
		if (thresholds[i] <= thresholds[i - 1]) {
			thresholds[i] = Math.min(255, thresholds[i - 1] + 1);
		}
	}

	return thresholds;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
	// Handle rgb(...) format
	const rgbMatch = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.exec(hex.trim());
	if (rgbMatch) {
		return { r: parseInt(rgbMatch[1]), g: parseInt(rgbMatch[2]), b: parseInt(rgbMatch[3]) };
	}
	// Remove # if present and strip alpha channel if it exists (8-char hex)
	const cleanHex = hex.replace('#', '').substring(0, 6);
	const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: { r: 0, g: 0, b: 0 };
}

/** Props for <IkedaImage>. Everything from {@link IkedaOptions} plus the ones below. */
export interface IkedaImageProps extends IkedaOptions {
	/** Source image, e.g. `/blog/beamhalo/hero.png`. Same-origin, or served with CORS headers. */
	src: string;
	/** The 3 colors to paint with, dimmest to brightest. Use one from `IKEDA_PALETTES` in `./palette`. */
	palette: ColorPalette;
	/** Alt text for the final image. */
	alt: string;
	/**
	 * Classes for the output `<img>` (size, opacity, object-fit). Not for the wrapper.
	 * The `<img>` sits inside a `flex` div, so give it an explicit size like `w-[90%] h-[90vh]`.
	 *
	 * @default ''
	 */
	className?: string;
	/**
	 * Show a side panel with the cut points and the real percent of pixels per color.
	 * Use it while tuning `colorDistribution`. Turn it off before you ship.
	 *
	 * @default false
	 */
	showDebug?: boolean;
}

/**
 * Drop-in component that shows an image as a dithered 3-color picture. See {@link IkedaOptions} for every knob.
 *
 * Needs a client component around it (it runs the canvas code in an effect).
 * Shows "PROCESSING..." until it finishes and "ERROR" if the image fails to load.
 *
 * GOTCHA: the effect re-runs whenever any prop changes by reference.
 * Pass the `palette`, `colorThresholds` and `colorDistribution` props as stable values
 * (e.g. `IKEDA_PALETTES.particles` or a constant outside the component).
 * An inline `[40, 25, 20, 15]` is a new array each parent render and re-dithers the image every time.
 *
 * @example
 * <IkedaImage
 *   src="/blog/beamhalo/hero.png"
 *   palette={IKEDA_PALETTES.particles}
 *   alt="CMS endcap"
 *   ditherMethod="atkinson"
 *   targetWidth={600}
 *   className="w-[90%] h-[90vh] object-contain opacity-40"
 * />
 */
export function IkedaImage({
	src,
	palette,
	alt,
	className = '',
	ditherMethod = 'atkinson',
	contrastBoost = 1.5,
	brightnessAdjust = 0,
	saturation = 1.0,
	colorThresholds = [64, 128, 192],
	invert = true, // Default to true for dots-on-black effect
	useHistogram = true, // Default to auto-calculate thresholds
	colorDistribution = [40, 25, 20, 15], // black, color1, color2, color3
	showDebug = false, // Show debug info
	targetWidth, // Upscale/downscale to this width
}: IkedaImageProps) {
	const [processedSrc, setProcessedSrc] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [debugInfo, setDebugInfo] = useState<{ thresholds: number[], colorCounts: number[], totalPixels: number, colorPercentages: number[] } | null>(null);

	useEffect(() => {
		processIkedaImage(src, palette, { 
			ditherMethod,
			contrastBoost,
			brightnessAdjust,
			saturation,
			colorThresholds,
			invert,
			useHistogram,
			colorDistribution,
			targetWidth,
		})
			.then((result) => {
				setProcessedSrc(result.dataUrl);
				setDebugInfo(result.debugInfo);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Failed to process image:', error);
				setLoading(false);
			});
	}, [src, palette, ditherMethod, contrastBoost, brightnessAdjust, saturation, colorThresholds, invert, useHistogram, colorDistribution, targetWidth]);

	if (loading) {
		return (
			<div className={`${className} flex items-center justify-center bg-black border border-[var(--grid-color)]`}>
				<span className="text-data text-accent">PROCESSING...</span>
			</div>
		);
	}

	return processedSrc ? (
		<div className="flex gap-4">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={processedSrc} alt={alt} className={className} style={{ imageRendering: 'pixelated' }} />
			{showDebug && debugInfo && (
				<div className="content-block text-sm font-mono space-y-2">
					<div className="text-accent font-bold mb-3">DEBUG INFO</div>
					
					<div className="space-y-1">
						<div className="text-gray-400">Thresholds:</div>
						<div>T1: {debugInfo.thresholds[0]}</div>
						<div>T2: {debugInfo.thresholds[1]}</div>
						<div>T3: {debugInfo.thresholds[2]}</div>
					</div>

					<div className="space-y-1 mt-3">
						<div className="text-gray-400">Color Distribution:</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 bg-black border border-gray-600"></div>
							<span>Black: {debugInfo.colorPercentages[0].toFixed(1)}%</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4" style={{ backgroundColor: palette.color1 }}></div>
							<span>Color1: {debugInfo.colorPercentages[1].toFixed(1)}%</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4" style={{ backgroundColor: palette.color2 }}></div>
							<span>Color2: {debugInfo.colorPercentages[2].toFixed(1)}%</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4" style={{ backgroundColor: palette.color3 }}></div>
							<span>Color3: {debugInfo.colorPercentages[3].toFixed(1)}%</span>
						</div>
					</div>

					<div className="mt-3">
						<div className="text-gray-400">Total Pixels:</div>
						<div>{debugInfo.totalPixels.toLocaleString()}</div>
					</div>
				</div>
			)}
		</div>
	) : (
		<div className={`${className} flex items-center justify-center bg-black border border-[var(--grid-color)]`}>
			<span className="text-data text-accent">ERROR</span>
		</div>
	);
}
