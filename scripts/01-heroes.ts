// Step 1 of the image build: dither each post's hero ahead of time.
//   npm run heroes
// Reads the full-size source from originals/heroes/<name>.png, writes public/heroes/<name>.png (already dithered
// and cropped) and src/data/heroes.json (the pixel sizes, so <Hero> can reserve the space).
// The browser used to download the source, dither it in JS, then crop. Now it just shows a PNG.
//
// This is the only place the per-post dither settings live. Change one, run this, commit the PNG.
// Hack: it imports palette.tsx just to read colors, which pulls in React. Harmless, a bit silly.
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
import { ditherPixels, cropBox } from '../src/utils/dither';
import type { IkedaOptions } from '../src/utils/dither';
import { IKEDA_PALETTES } from '../src/utils/palette';

type Hero = { name: string; palette: string; opts: IkedaOptions };

// What <Hero> used to default to: atkinson, invert, histogram split 40/25/20/15, fade (erode 0.3).
const BASE: IkedaOptions = {
	ditherMethod: 'atkinson',
	contrastBoost: 1.5,
	brightnessAdjust: 0,
	invert: true,
	useHistogram: true,
	colorDistribution: [40, 25, 20, 15],
	grit: 0.4,
	splatter: 0.6,
	erode: 0.3,
};

const HEROES: Hero[] = [
	{ name: 'arachne', palette: 'arachne', opts: { targetWidth: 600 } },
	{ name: 'beamhalo', palette: 'particles', opts: { targetWidth: 600, contrastBoost: 2, brightnessAdjust: -80, invert: false } },
	{ name: 'beehive-cluster', palette: 'astronomy', opts: { targetWidth: 1000, invert: false } },
	{ name: 'cacti', palette: 'cacti', opts: { targetWidth: 600, ditherMethod: 'ordered', brightnessAdjust: 50 } },
	{ name: 'owlsat', palette: 'owlsat', opts: { targetWidth: 600, ditherMethod: 'ordered' } },
	{ name: 'rice-robotics', palette: 'robotics', opts: { targetWidth: 600, brightnessAdjust: -30, invert: false } },
	{ name: 'rice-robotics-2', palette: 'robotics', opts: { targetWidth: 600, brightnessAdjust: -30, invert: false, grit: 0.6, splatter: 0.8 } },
];

async function makeHero(h: Hero) {
	const opts = { ...BASE, ...h.opts };
	const meta = await sharp(`originals/heroes/${h.name}.png`).metadata();
	const w = opts.targetWidth!;
	const ht = Math.round(w * (meta.height! / meta.width!)); // same rounding as the browser version

	const { data: raw } = await sharp(`originals/heroes/${h.name}.png`)
		.ensureAlpha()
		.resize(w, ht, { fit: 'fill' })
		.raw()
		.toBuffer({ resolveWithObject: true });
	const data = new Uint8ClampedArray(raw);
	// a canvas gives rgb 0 under alpha 0. A file can hold anything there, and invert would show it.
	for (let i = 0; i < data.length; i += 4) if (data[i + 3] === 0) data[i] = data[i + 1] = data[i + 2] = 0;

	const info = ditherPixels(data, w, ht, IKEDA_PALETTES[h.palette], opts);
	const box = cropBox(data, w, ht);
	if (!box) throw new Error(`${h.name}: nothing visible after dither`);
	const [x0, y0, x1, y1] = box;

	const out = `public/heroes/${h.name}.png`;
	await sharp(Buffer.from(data.buffer), { raw: { width: w, height: ht, channels: 4 } })
		.extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 })
		.png({ compressionLevel: 9 })
		.toFile(out);
	const size = { w: x1 - x0 + 1, h: y1 - y0 + 1 };
	console.log(h.name.padEnd(16), `${size.w}x${size.h}`, 'colors %', info.colorPercentages.map((p) => p.toFixed(1)).join(' / '));
	return size;
}

mkdirSync('public/heroes', { recursive: true });
const sizes: Record<string, { w: number; h: number }> = {};
for (const h of HEROES) sizes[h.name] = await makeHero(h);
writeFileSync('src/data/heroes.json', JSON.stringify(sizes, null, '\t') + '\n');
console.log('wrote src/data/heroes.json');
