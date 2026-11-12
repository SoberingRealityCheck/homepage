// Step 2 of the image build: make web-size copies of the big pictures in posts.
//   npm run shrink
// The full-size originals live in originals/ (same sub-path as in public/). This reads them and writes
// public/<same path>.webp, at most MAX_WIDTH wide. Run it again after changing the numbers below.
// Hero sources are in originals/heroes/. Those belong to scripts/01-heroes.ts, not this one.
//
// To add a picture: put the full-size file in originals/<same folder as in public>/, run this,
// and point the page at the .webp. This script also rewrites "/folder/name.png" to ".webp" in the
// post pages, so a first run on an old file fixes the page for you.
// Hack: pages that build the file name in code (beamhalo's <Figs>) need their `ext: 'webp'` by hand.
import sharp from 'sharp';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const MAX_WIDTH = 1600; // the text column is 48rem = 768px. 2x covers retina.
const QUALITY = 82;
const MIN_BYTES = 500_000; // only files this big get moved. Small ones are fine as they are.
const FOLDERS = ['arachne', 'beehive-cluster', 'cacti', 'owlsat', 'robotics', 'blog/beamhalo'];
// Plots with flat colors and thin text: lossy webp smears them, so these stay PNG, just resized.
const KEEP_PNG: string[] = [];

const walk = (d: string): string[] =>
	readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const isImage = (f: string) => /\.(png|jpe?g)$/i.test(f);

// 1. first run: move big files from public/ into originals/ (a copy, then delete, so git sees a move)
for (const folder of FOLDERS) {
	if (!existsSync(`public/${folder}`)) continue;
	for (const f of readdirSync(`public/${folder}`)) {
		const pub = `public/${folder}/${f}`;
		if (!isImage(f) || statSync(pub).size < MIN_BYTES) continue;
		mkdirSync(`originals/${folder}`, { recursive: true });
		copyFileSync(pub, `originals/${folder}/${f}`);
		rmSync(pub);
		console.log('moved   ', pub, '->', `originals/${folder}/${f}`);
	}
}

// 2. every original (not a hero source) gets a web copy
const pages = walk('src/app/blog').filter((f) => f.endsWith('.tsx'));
for (const src of walk('originals').filter((f) => isImage(f) && !f.startsWith('originals/heroes/'))) {
	const rel = src.slice('originals/'.length); // cacti/boys.png
	const ext = KEEP_PNG.includes(rel) ? '.png' : '.webp';
	const out = `public/${rel.replace(/\.[^.]+$/, ext)}`;
	const img = sharp(src).resize({ width: MAX_WIDTH, withoutEnlargement: true });
	await (ext === '.png' ? img.png({ compressionLevel: 9 }) : img.webp({ quality: QUALITY })).toFile(out);
	console.log(`${(statSync(src).size / 1e6).toFixed(1)}MB -> ${(statSync(out).size / 1e6).toFixed(2)}MB`, out);

	// 3. point the pages at it
	for (const page of pages) {
		const text = readFileSync(page, 'utf8');
		const next = text.split(`/${rel}`).join(`/${rel.replace(/\.[^.]+$/, ext)}`);
		if (next !== text) writeFileSync(page, next);
	}
}
