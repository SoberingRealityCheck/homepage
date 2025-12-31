import { ColorPalette } from './palette';

/**
 * Converts an image to a dithered, high-contrast version using a 3-color palette
 * Inspired by Ryoji Ikeda's aesthetic
 * 
 * @param imageUrl - URL or path to the source image
 * @param palette - 3-color palette to use (color1, color2, color3)
 * @param options - Processing options
 * @returns Promise that resolves to a data URL of the processed image
 */
export async function processIkedaImage(
	imageUrl: string,
	palette: ColorPalette,
	options: {
		ditherMethod?: 'floyd-steinberg' | 'atkinson' | 'ordered';
		threshold?: number;
		contrastBoost?: number;
		brightnessAdjust?: number;
		saturation?: number;
		// Custom thresholds for color mapping (0-255)
		colorThresholds?: [number, number, number]; // [black->color1, color1->color2, color2->color3]
		invert?: boolean; // Invert the image before processing (for dots-on-black effect)
		useHistogram?: boolean; // Auto-calculate thresholds from image histogram
		// Distribution percentages when using histogram (must sum to 100)
		colorDistribution?: [number, number, number, number]; // [black%, color1%, color2%, color3%]
		targetWidth?: number; // Upscale/downscale image to this width before processing
	} = {}
): Promise<{
	dataUrl: string;
	debugInfo: {
		thresholds: [number, number, number];
		colorCounts: [number, number, number, number];
		totalPixels: number;
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

				// Step 5: Apply dithering with 4-level quantization
				// The dithering will use thresholds to choose the right level for each pixel
				if (ditherMethod === 'floyd-steinberg') {
					multiLevelFloydSteinberg(data, canvas.width, canvas.height, [0, 85, 170, 255]);
				} else if (ditherMethod === 'atkinson') {
					multiLevelAtkinson(data, canvas.width, canvas.height, [0, 85, 170, 255]);
				} else {
					multiLevelOrdered(data, canvas.width, canvas.height, [0, 85, 170, 255]);
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
 * Multi-level Floyd-Steinberg dithering
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
 * Multi-level Atkinson dithering
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
 * Multi-level ordered (Bayer matrix) dithering
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
 * Calculate color thresholds based on histogram distribution
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

/**
 * Simple wrapper component for applying the Ikeda image effect
 * Usage: <IkedaImage src="/path/to/image.jpg" palette={myPalette} alt="Description" />
 */
import { useEffect, useState } from 'react';

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
}: {
	src: string;
	palette: ColorPalette;
	alt: string;
	className?: string;
	ditherMethod?: 'floyd-steinberg' | 'atkinson' | 'ordered';
	contrastBoost?: number;
	brightnessAdjust?: number;
	saturation?: number;
	colorThresholds?: [number, number, number];
	invert?: boolean;
	useHistogram?: boolean;
	colorDistribution?: [number, number, number, number];
	showDebug?: boolean;
	targetWidth?: number;
}) {
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
			<img src={processedSrc} alt={alt} className={className} />
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
