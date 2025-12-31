'use client';

import Link from 'next/link';
import { ColorPalette } from '@/utils/palette';

export function ProjectCard({
	title,
	description,
	tags,
	link,
	year,
	palette,
}: {
	title: string;
	description: string;
	tags: string[];
	link: string;
	year: string;
	palette: ColorPalette;
}) {
	return (
		<Link 
			href={link} 
			className="project-card group relative"
			style={{
				borderColor: 'var(--grid-color)',
				borderTopColor: palette.color1,
				['--hover-border-color' as string]: palette.color1,
				['--hover-glow-color' as string]: palette.color1 + '33', // Add transparency
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.borderColor = palette.color1;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.borderColor = 'var(--grid-color)';
				e.currentTarget.style.borderTopColor = palette.color1;
			}}
			onTouchStart={(e) => {
				e.currentTarget.style.borderColor = palette.color1;
			}}
			onTouchEnd={(e) => {
				e.currentTarget.style.borderColor = 'var(--grid-color)';
				e.currentTarget.style.borderTopColor = palette.color1;
			}}
		>
			{/* Palette indicator stripe */}
			<div 
				className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
				style={{
					background: `linear-gradient(90deg, ${palette.color1} 0%, ${palette.color2} 50%, ${palette.color3} 100%)`
				}}
			/>
			
			<div className="flex justify-between items-start mb-3">
				<h2 className="text-heading text-2xl padding-1">{title}</h2>
				<span className="text-data text-xs text-gray-500">{year}</span>
			</div>
			<p className="mb-4 leading-relaxed text-gray-300">{description}</p>
			
			{/* Palette preview dots */}
			<div className="flex gap-2 mb-3">
				<div 
					className="w-2 h-2 rounded-full" 
					style={{ backgroundColor: palette.color1 }}
					title={palette.name}
				/>
				<div 
					className="w-2 h-2 rounded-full" 
					style={{ backgroundColor: palette.color2 }}
				/>
				<div 
					className="w-2 h-2 rounded-full" 
					style={{ backgroundColor: palette.color3 }}
				/>
			</div>
			
			<div className="line-grid" />
			<div className="flex flex-wrap gap-2 mt-4">
				{tags.map((tag) => (
					<span 
						key={tag} 
						className="text-data text-xs px-3 py-1 border transition-colors"
						style={{
							borderColor: 'var(--grid-color)',
							color: '#999',
						}}
					>
						{tag}
					</span>
				))}
			</div>
		</Link>
	);
}
