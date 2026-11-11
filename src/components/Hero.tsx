'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { processIkedaImage } from '@/utils/ikedaImage';
import type { ColorPalette } from '@/utils/palette';

// The dithered image behind a post. Layout lives in globals.css (.hero, .hero-spacer):
//   desktop: top lines up with the headshot
//   phones:  fills the width, upper part of the screen, dimmer
// We dither here and then crop to the visible (non-transparent) pixels. The dither makes the
// background transparent, so the source image's own margins would put the subject off-center.
// The crop also gives the real width / height, which the CSS needs (--hero-ar).
// scale: make the picture bigger than "fits the screen" (1 = fits). It overflows the bottom and sides.
//   Phones ignore it: there the image already fills the width.
// lift: slide the whole picture up, in vh. 0 = where it normally sits.
// fade: soften the picture's edges. Only for photos with a solid background. Images with a
//   transparent background don't need it (it would just dim their corners).
// grit: 0 to 1. Roughens clean images (renders, diagrams) so they look like grainy photos. See IkedaOptions.
// splatter: 0 to 1. Flings specks onto the empty background around the shape. See IkedaOptions.
// Keep the classes "fixed inset-0 z-0": BackgroundFade and a globals.css rule find the layer by them.
type HeroProps = {
	src: string;
	palette: ColorPalette;
	fade?: boolean;
	scale?: number;
	lift?: number;
	alt?: string;
	ditherMethod?: 'floyd-steinberg' | 'atkinson' | 'ordered';
	contrastBoost?: number;
	brightnessAdjust?: number;
	invert?: boolean;
	targetWidth?: number;
	grit?: number;
	splatter?: number;
};

type Cropped = { url: string; ar: number };

// Crop a PNG data url to its non-transparent pixels.
// Hack: a row or column only counts if 2+ pixels in it are visible, so a stray speck at the
// edge (stars!) doesn't stretch the box. Hand-picked, not tuned.
function cropToContent(dataUrl: string): Promise<Cropped> {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => {
			const w = img.naturalWidth, h = img.naturalHeight;
			const canvas = document.createElement('canvas');
			canvas.width = w; canvas.height = h;
			const ctx = canvas.getContext('2d', { willReadFrequently: true });
			if (!ctx) return resolve({ url: dataUrl, ar: w / h });
			ctx.drawImage(img, 0, 0);
			const px = ctx.getImageData(0, 0, w, h).data;
			const rows = new Uint32Array(h), cols = new Uint32Array(w);
			for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
				if (px[(y * w + x) * 4 + 3] > 10) { rows[y]++; cols[x]++; }
			}
			const first = (a: Uint32Array) => a.findIndex((n) => n >= 2);
			const last = (a: Uint32Array) => { for (let i = a.length - 1; i >= 0; i--) if (a[i] >= 2) return i; return -1; };
			const x0 = first(cols), x1 = last(cols), y0 = first(rows), y1 = last(rows);
			if (x0 < 0 || y0 < 0 || x1 <= x0 || y1 <= y0) return resolve({ url: dataUrl, ar: w / h });
			const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
			const out = document.createElement('canvas');
			out.width = cw; out.height = ch;
			out.getContext('2d')!.drawImage(canvas, x0, y0, cw, ch, 0, 0, cw, ch);
			resolve({ url: out.toDataURL('image/png'), ar: cw / ch });
		};
		img.onerror = () => resolve({ url: dataUrl, ar: 1 });
		img.src = dataUrl;
	});
}

export function Hero({
	src,
	palette,
	fade = false,
	scale = 1,
	lift = 0,
	alt = 'Background',
	ditherMethod = 'atkinson',
	contrastBoost = 1.5,
	brightnessAdjust = 0,
	invert = true, // same defaults as <IkedaImage>, which these pages used before
	targetWidth,
	grit = 0,
	splatter = 0,
}: HeroProps) {
	const [img, setImg] = useState<Cropped | null>(null);

	useEffect(() => {
		let cancelled = false;
		processIkedaImage(src, palette, {
			ditherMethod,
			contrastBoost,
			brightnessAdjust,
			invert,
			useHistogram: true,
			colorDistribution: [40, 25, 20, 15],
			targetWidth,
			grit,
			splatter,
		})
			.then((r) => cropToContent(r.dataUrl))
			.then((c) => { if (!cancelled) setImg(c); })
			.catch((e) => console.error('Hero: failed to process image', e));
		return () => { cancelled = true; };
	}, [src, palette, ditherMethod, contrastBoost, brightnessAdjust, invert, targetWidth, grit, splatter]);

	return (
		<div
			className={`hero ${fade ? 'hero-fade ' : ''}fixed inset-0 z-0 flex justify-center`}
			style={{ '--hero-ar': img?.ar ?? 1, '--hero-scale': scale, '--hero-lift': `${lift}vh` } as CSSProperties}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			{img && <img src={img.url} alt={alt} className="object-contain opacity-40" style={{ imageRendering: 'pixelated' }} />}
		</div>
	);
}

// Blank space above the title so the image shows first. Shorter on phones.
export function HeroSpacer() {
	return <div className="hero-spacer" />;
}
