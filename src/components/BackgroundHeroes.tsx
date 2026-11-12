import type { CSSProperties } from 'react';
import HEROES from '@/data/heroes.json';

// Tiny faded project heroes, like stickers, tucked into the empty margins. On every page, blog posts too.
// Hand picked. x / y are % of the viewport, size is in rem, rot is degrees.
// fade multiplies the base opacity in globals.css (default 1). Beehive cluster has few pixels, so it's bigger and fainter.
// The layer is fixed, so they stay put while you scroll. Styles: .bg-heroes in globals.css.
const SPOTS: { name: keyof typeof HEROES; x: number; y: number; size: number; rot: number; fade?: number }[] = [
	// x, y, size and tilt are all uneven so it doesn't read as two columns.
	//{ name: 'beehive-cluster', x: 0, y: 0, size: 120, rot: -13, fade: 1.850 },
	//{ name: 'owlsat', x: 8, y: 30, size: 10, rot: 7 },
	//{ name: 'arachne', x: 11, y: 64, size: 8, rot: 19 },
	//{ name: 'cacti', x: 79, y: 3, size: 9, rot: 9 },
	//{ name: 'rice-robotics-2', x: 93, y: 38, size: 7, rot: -17 },
	//{ name: 'beamhalo', x: 69, y: 80, size: 10, rot: 4 },
	//{ name: 'rice-robotics', x: 64, y: 30, size: 7, rot: -9 },
];

export default function BackgroundHeroes() {
	return (
		<>
		<div className="bg-noise" aria-hidden="true" />
		<div className="bg-heroes" aria-hidden="true">
			{SPOTS.map(({ name, x, y, size, rot, fade = 1 }) => (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					key={name}
					src={`/heroes/${name}.png`}
					alt=""
					width={HEROES[name].w}
					height={HEROES[name].h}
					style={{ left: `${x}%`, top: `${y}%`, width: `${size}rem`, height: 'auto', transform: `rotate(${rot}deg)`, imageRendering: 'pixelated', '--fade': fade } as CSSProperties}
				/>
			))}
		</div>
		</>
	);
}
