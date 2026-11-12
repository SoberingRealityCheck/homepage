// Step 3 of the image build: make web-size copies of the clips in posts.
//   npm run videos
// Full-size originals live in originals/ (same sub-path as in public/). This reads them and writes
// public/<same path>.webm: VP9, no sound, at most MAX_SIDE px on the long side, at most MAX_FPS.
// The clips are muted autoplay loops in a 768px column, so this is plenty.
// First run: moves each big .webm from public/ to originals/ first. Also moves .mp4 files no page uses
// (they only bloat the deploy). Needs ffmpeg on the PATH.
//
// Slow (a few minutes). Hack: CRF 40 is eyeballed, not tuned per clip. Lower it for sharper, bigger files.
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';

const MAX_SIDE = 960;
const MAX_FPS = 30;
const CRF = 40;
const MIN_BYTES = 1_000_000; // smaller clips are fine as they are
const FOLDERS = ['arachne', 'robotics', 'cacti'];

const walk = (d: string): string[] =>
	readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

const pageText = walk('src/app/blog').filter((f) => f.endsWith('.tsx')).map((f) => readFileSync(f, 'utf8')).join('\n');
const used = (rel: string) => pageText.includes(`/${rel}`);

// 1. first run: move big clips (and unused .mp4s) out of public/
for (const folder of FOLDERS) {
	for (const f of readdirSync(`public/${folder}`)) {
		const rel = `${folder}/${f}`;
		const pub = `public/${rel}`;
		const big = /\.webm$/i.test(f) && statSync(pub).size >= MIN_BYTES;
		const unusedMp4 = /\.mp4$/i.test(f) && !used(rel);
		if (!big && !unusedMp4) continue;
		mkdirSync(`originals/${folder}`, { recursive: true });
		copyFileSync(pub, `originals/${rel}`);
		rmSync(pub);
		console.log('moved   ', pub, '->', `originals/${rel}`);
	}
}

// 2. every original .webm gets a web copy
for (const src of walk('originals').filter((f) => f.endsWith('.webm'))) {
	const out = `public/${src.slice('originals/'.length)}`;
	// scale so the long side is at most MAX_SIDE. -2 keeps the other side even. Never scales up.
	const scale = `scale='if(gt(iw,ih),min(iw,${MAX_SIDE}),-2)':'if(gt(iw,ih),-2,min(ih,${MAX_SIDE}))'`;
	const r = spawnSync('ffmpeg', [
		'-y', '-v', 'error', '-i', src, '-an',
		'-vf', `fps='min(source_fps,${MAX_FPS})',${scale}`,
		'-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', String(CRF), '-row-mt', '1', '-cpu-used', '2',
		out,
	], { stdio: 'inherit' });
	if (r.status !== 0) throw new Error(`ffmpeg failed on ${src}`);
	console.log(`${(statSync(src).size / 1e6).toFixed(1)}MB -> ${(statSync(out).size / 1e6).toFixed(1)}MB`, out);
}
