import { useEffect, useState } from 'react';
import { ColorPalette } from './palette';
import { ditherPixels } from './dither';
import type { IkedaOptions } from './dither';

export type { IkedaOptions };
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
): Promise<{ dataUrl: string; debugInfo: ReturnType<typeof ditherPixels> }> {
	const { targetWidth } = options;

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
					height = Math.round(targetWidth * (height / width));
					width = targetWidth;
				}
				canvas.width = width;
				canvas.height = height;

				ctx.drawImage(img, 0, 0, width, height);
				const imageData = ctx.getImageData(0, 0, width, height);
				const debugInfo = ditherPixels(imageData.data, width, height, palette, options);
				ctx.putImageData(imageData, 0, 0);
				resolve({ dataUrl: canvas.toDataURL(), debugInfo });
			} catch (error) {
				reject(error);
			}
		};

		img.onerror = () => reject(new Error('Failed to load image'));
		img.src = imageUrl;
	});
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
	grit = 0,
	splatter = 0,
	erode = 0,
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
			grit,
			splatter,
			erode,
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
	}, [src, palette, ditherMethod, contrastBoost, brightnessAdjust, saturation, colorThresholds, invert, useHistogram, colorDistribution, targetWidth, grit, splatter, erode]);

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

