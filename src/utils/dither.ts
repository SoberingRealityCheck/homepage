// The pixel part of the dither. No DOM, no React, no imports from the app: plain values in, plain values out.
// Two callers: the browser wrapper in ikedaImage.tsx, and scripts/01-heroes.ts (build time, via sharp).
// So the dither runs the same in both places.

export type Colors = { color1: string; color2: string; color3: string };


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

	/**
	 * Roughness, 0 to 1. Makes clean images (CAD renders, screenshots) look like a grainy photo.
	 * Clean edges and flat areas dither into tidy lines and grids. Real photos don't, because
	 * sensors, film and JPEG blur and jitter every pixel a little before it's quantized.
	 * This fakes that in two steps:
	 * - crumble: every pixel is read from a random neighbor up to `2 * grit` px away. Edges go ragged.
	 *   (Runs on the resized color image, before brightness and contrast.)
	 * - clumped noise: blurred random noise, sigma `30 * grit` gray levels, is added right before
	 *   the dither. It makes small blobs, not TV static. Pure-black pixels are skipped so the
	 *   empty background stays clean.
	 *
	 * 0 = off. About 0.4 is a hint, 0.6 is clearly grainy, 0.8+ starts to eat thin shapes.
	 * Same grain every time (fixed random seed), so the image doesn't change between page loads.
	 *
	 * @default 0
	 */
	grit?: number;

	/**
	 * Ink splatter, 0 to 1. Lit pixels fling specks onto the empty background around them.
	 * Each lit pixel throws a drop with chance `0.4 * splatter`, in a random direction.
	 * Distance has a long tail: mean about `2 + 6 * splatter` px, so most specks land at the edge
	 * and a few fly far. A drop only lands on an empty pixel and keeps its source color.
	 * Runs after the dither, so it adds pixels and never moves existing ones.
	 * Specks can't leave the canvas, so images with no margin get clipped splatter.
	 * Independent of `grit`. They stack well.
	 * Same specks every time (fixed random seed).
	 *
	 * @default 0
	 */
	splatter?: number;

	/**
	 * Eroded edges, 0 to 0.5. A fade that removes pixels instead of dimming them.
	 * The value is how deep the fade zone goes from each side, as a share of the image width / height.
	 * At the outer edge every pixel is removed. At the inner edge of the zone none are.
	 * In between, the chance of removal eases from 100% to 0%, so the picture breaks up into specks.
	 * The left/right and top/bottom chances multiply, so corners erode the most.
	 * Runs after `splatter`, so flung specks erode too. Removed pixels turn transparent.
	 * 0.3 matches the old CSS fade. 0 = off.
	 * Same pattern every time (fixed random seed).
	 *
	 * @default 0
	 */
	erode?: number;
}

/** Shape of an image, in pixels, for the Node script and the browser wrapper to share. */
export type DitherInfo = {
	/** The 3 gray cut points that were actually used (0 to 255). */
	thresholds: [number, number, number];
	/** Pixel count per level: [black, color1, color2, color3]. */
	colorCounts: [number, number, number, number];
	totalPixels: number;
	/** Same as colorCounts, in percent. */
	colorPercentages: [number, number, number, number];
};

/**
 * Dither RGBA pixels in place. `data` is width * height * 4 bytes, already resized.
 * Black level becomes transparent (alpha 0). Other pixels keep their source alpha.
 * Hack: callers must zero the RGB of fully transparent source pixels first, like a canvas does.
 */
export function ditherPixels(
	data: Uint8ClampedArray,
	width: number,
	height: number,
	palette: Colors,
	options: IkedaOptions = {}
): DitherInfo {
	const {
		ditherMethod = 'floyd-steinberg',
		contrastBoost = 1.5,
		brightnessAdjust = 0,
		saturation = 1.0,
		colorThresholds = [64, 128, 192],
		invert = false,
		useHistogram = true,
		colorDistribution = [40, 25, 20, 15], // black, color1, color2, color3
		grit = 0,
		splatter = 0,
		erode = 0,
	} = options;
	const rand = mulberry32(1234); // fixed seed: same grain every time

	// Step 0: crumble the edges (see `grit`)
if (grit > 0) crumble(data, width, height, grit * 2, rand);

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

// Step 4.9: clumped noise, so the dither can't fall into a tidy pattern (see `grit`)
if (grit > 0) addClumpedNoise(data, width, height, grit * 30, rand);

// Step 5: Apply dithering with 4-level quantization
if (ditherMethod === 'floyd-steinberg') {
	multiLevelFloydSteinberg(data, width, height, ditherLevels);
} else if (ditherMethod === 'atkinson') {
	multiLevelAtkinson(data, width, height, ditherLevels);
} else {
	multiLevelOrdered(data, width, height, ditherLevels);
}

// Step 5.5: splatter specks onto the empty background (see `splatter`)
if (splatter > 0) splash(data, width, height, splatter, rand);

// Step 5.6: eat the edges away (see `erode`)
if (erode > 0) erodeEdges(data, width, height, erode, rand);

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

	const colorPercentages: [number, number, number, number] = [
	(colorCounts[0] / totalPixels) * 100,
	(colorCounts[1] / totalPixels) * 100,
	(colorCounts[2] / totalPixels) * 100,
	(colorCounts[3] / totalPixels) * 100,
];

	return { thresholds: finalThresholds, colorCounts, totalPixels, colorPercentages };
}

/**
 * Box around every visible pixel (alpha > 10): [x0, y0, x1, y1], inclusive. null if nothing is visible.
 * Lossless on purpose. A trimmed crop cut off real parts of the picture (feet, tails).
 */
export function cropBox(data: Uint8ClampedArray, width: number, height: number): [number, number, number, number] | null {
	let x0 = width, x1 = -1, y0 = height, y1 = -1;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		if (data[(y * width + x) * 4 + 3] > 10) {
			if (x < x0) x0 = x;
			if (x > x1) x1 = x;
			if (y < y0) y0 = y;
			if (y > y1) y1 = y;
		}
	}
	return x1 < 0 ? null : [x0, y0, x1, y1];
}

/** Small seeded random generator. Returns numbers in [0, 1). Same seed, same sequence. */
function mulberry32(seed: number): () => number {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) >>> 0;
		let t = a;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/**
 * Replace every pixel's color with the color of a random neighbor up to `radius` px away.
 * Alpha stays put. Ragged edges, like a low-res photo that was blown up.
 */
function crumble(data: Uint8ClampedArray, width: number, height: number, radius: number, rand: () => number) {
	const from = Uint8ClampedArray.from(data);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const sx = Math.min(width - 1, Math.max(0, Math.round(x + (rand() * 2 - 1) * radius)));
			const sy = Math.min(height - 1, Math.max(0, Math.round(y + (rand() * 2 - 1) * radius)));
			const i = (y * width + x) * 4;
			const k = (sy * width + sx) * 4;
			data[i] = from[k];
			data[i + 1] = from[k + 1];
			data[i + 2] = from[k + 2];
		}
	}
}

/**
 * Add gaussian noise to the gray channel, blurred twice (3x3 box) so it clumps, then rescaled so its
 * standard deviation is `sigma`. Pixels at 0 are left alone so the empty background stays clean.
 * Expects gray data (r = g = b). Writes r, g and b.
 */
function addClumpedNoise(data: Uint8ClampedArray, width: number, height: number, sigma: number, rand: () => number) {
	const n = width * height;
	let f = new Float32Array(n);
	for (let i = 0; i < n; i++) {
		// Box-Muller
		f[i] = Math.sqrt(-2 * Math.log(rand() + 1e-12)) * Math.cos(2 * Math.PI * rand());
	}
	for (let pass = 0; pass < 2; pass++) {
		const g = new Float32Array(n);
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				let sum = 0, count = 0;
				for (let dy = -1; dy <= 1; dy++) {
					for (let dx = -1; dx <= 1; dx++) {
						const xx = x + dx, yy = y + dy;
						if (xx >= 0 && xx < width && yy >= 0 && yy < height) { sum += f[yy * width + xx]; count++; }
					}
				}
				g[y * width + x] = sum / count;
			}
		}
		f = g;
	}
	// Blurring shrinks the spread. Scale it back up so `sigma` means what it says.
	let sumSq = 0;
	for (let i = 0; i < n; i++) sumSq += f[i] * f[i];
	const scale = sigma / Math.sqrt(sumSq / n || 1);
	for (let i = 0; i < n; i++) {
		const j = i * 4;
		if (data[j] > 0) data[j] = data[j + 1] = data[j + 2] = data[j] + f[i] * scale;
	}
}

/**
 * Throw drops from lit pixels onto empty ones. Works on dithered gray levels (0 = empty).
 * Reads from a snapshot, so a drop never throws another drop.
 * Distance is exponential (mean `2 + 6 * amount` px), capped at 6x the mean.
 */
function splash(data: Uint8ClampedArray, width: number, height: number, amount: number, rand: () => number) {
	const from = Uint8ClampedArray.from(data);
	const mean = 2 + 6 * amount;
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const i = (y * width + x) * 4;
			if (from[i] === 0 || rand() > 0.4 * amount) continue;
			const angle = rand() * 2 * Math.PI;
			const dist = Math.min(-Math.log(1 - rand()) * mean, mean * 6);
			const tx = Math.round(x + Math.cos(angle) * dist);
			const ty = Math.round(y + Math.sin(angle) * dist);
			if (tx < 0 || tx >= width || ty < 0 || ty >= height) continue;
			const k = (ty * width + tx) * 4;
			if (from[k] !== 0) continue;
			data[k] = data[k + 1] = data[k + 2] = from[i];
			data[k + 3] = 255; // sources with a transparent background would hide the drop
		}
	}
}

/**
 * Remove pixels at random, more of them the closer they are to an edge.
 * `zone` is the depth of the fade from each side (share of width / height).
 * Keep chance is smoothstep(distance / zone), per axis, multiplied.
 * Works on dithered gray levels. Setting a pixel to 0 makes it the empty level.
 * Hack: the chance is per pixel and independent, so it reads as fine static, not clumps.
 */
function erodeEdges(data: Uint8ClampedArray, width: number, height: number, zone: number, rand: () => number) {
	const smooth = (t: number) => { t = Math.min(1, t); return t * t * (3 - 2 * t); };
	for (let y = 0; y < height; y++) {
		const keepY = smooth(Math.min(y + 0.5, height - y - 0.5) / height / zone);
		for (let x = 0; x < width; x++) {
			const i = (y * width + x) * 4;
			if (data[i] === 0) continue;
			const keepX = smooth(Math.min(x + 0.5, width - x - 0.5) / width / zone);
			if (rand() > keepX * keepY) data[i] = data[i + 1] = data[i + 2] = 0;
		}
	}
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
