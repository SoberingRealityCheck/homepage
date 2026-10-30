import Link from 'next/link';
import { ColorPalette } from '@/utils/palette';

// palette stays in the props so the data files don't change. The new look ignores it.
export function ProjectCard({
	title,
	description,
	tags,
	link,
	year,
}: {
	title: string;
	description: string;
	tags: string[];
	link: string;
	year: string;
	palette?: ColorPalette;
}) {
	return (
		<Link href={link} className="project-card">
			<div className="text-data mb-1">{year}</div>
			<h2 className="project-title text-heading text-xl mb-2">{title}</h2>
			<p className="mb-3 text-[var(--ink)]">{description}</p>
			<div className="text-data">{tags.join(' · ')}</div>
		</Link>
	);
}
