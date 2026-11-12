import HEROES from '@/data/heroes.json';

// The dithered picture at the top of a post. Just an <img>: the dithering is done ahead of time
// by `npm run heroes` (scripts/01-heroes.ts), which writes public/heroes/<name>.png and heroes.json.
// Per-post dither settings live in that script, not on the page.
// Layout lives in globals.css (.hero). width / height are the real pixels, so nothing jumps on load.
type HeroName = keyof typeof HEROES;

export function Hero({ name, alt = 'Background' }: { name: HeroName; alt?: string }) {
	const { w, h } = HEROES[name];
	return (
		<div className="hero">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={`/heroes/${name}.png`} alt={alt} width={w} height={h} style={{ imageRendering: 'pixelated' }} />
		</div>
	);
}
