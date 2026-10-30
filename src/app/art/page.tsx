import Image from 'next/image';
import Link from 'next/link';

const PIECES = [
	{ name: 'Sand', href: 'https://sand.claygoldsmith.com', src: '/art/sand.png' },
	{ name: 'Oasis', href: 'https://oasis.claygoldsmith.com', src: '/art/oasis.png' },
];

const MUSIC = [
	{ name: 'YouTube', href: 'https://www.youtube.com/@clays-awesome-username', label: 'youtube.com/@clays-awesome-username' },
	{ name: 'Bandcamp', href: 'https://zephyrgoldshine.bandcamp.com/album/thalassophobia', label: 'thalassophobia' },
];

export default function ArtPage() {
	return (
		<div className="section">
			<h1 className="text-display mb-8">Art</h1>

			<div className="flex gap-6 mb-10">
				{PIECES.map((p) => (
					<div key={p.name} className="flex-1 min-w-0 max-w-[30vh]">
						<h2 className="text-heading text-lg mb-2">{p.name}</h2>
						<Link href={p.href} target="_blank" rel="noopener noreferrer">
							<Image
								src={p.src}
								alt={p.name}
								width={600}
								height={400}
								className="w-full aspect-square object-cover"
							/>
						</Link>
					</div>
				))}
			</div>

			<h2 className="text-heading text-lg mb-2">Music</h2>
			{MUSIC.map((m) => (
				<div key={m.name} className="project-card !py-3">
					<div className="text-data mb-1">{m.name}</div>
					<a href={m.href} target="_blank" rel="noopener noreferrer" className="link">
						{m.label}
					</a>
				</div>
			))}
		</div>
	);
}
