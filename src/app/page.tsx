'use client';

import Link from 'next/link';
import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';
import { ProjectCard } from '@/components/ProjectCard';
import { PROJECTS } from '@/data/projects';
import { IkedaImage } from '@/utils/ikedaImage';

export default function Home() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.homepage}>
			{/* Background image layer */}
			<div className="flex items-center justify-center min-h-screen fixed inset-0 z-0"
			style={{marginLeft: '500px'}}>
			<IkedaImage
				src="/home/me.png" 
				palette={IKEDA_PALETTES.homeimg}
				alt="Background"
				ditherMethod="atkinson"
				className="w-[90%] h-[90vh] mx-auto object-contain opacity-40"
				brightnessAdjust={12.0}
			/>
				</div>
			
			{/* Content layer */}
			<>
			{/* Hero Section */}
			<section className="section min-h-[80vh] flex flex-col justify-center">
				<div className="data-stripe-colorless mb-8" />
				
				<h1 className="text-display mb-6">
					<span className="text-accent">{'>'}</span> Clay Goldsmith
				</h1>

			<p className="text-xl max-w-2xl mb-8 leading-relaxed whitespace-pre-line">
					Rice University, Class of 2027 &#8212; B.S. in Computational Physics, Minor in Engineering Design.
				</p>

				<div className="flex gap-4 mt-4">
					<Link href="/projects" className="btn btn-accent">
						View Projects
					</Link>
					<Link href="/about" className="btn">
						About Me
					</Link>
				</div>

				<div className="data-stripe-colorless mt-12" />
			</section>

			{/* Featured Projects Section */}
			<section className="section">
				<h2 className="text-heading text-3xl mb-8 flex items-center gap-4">
					<span className="text-accent">{"//"}</span>
					Featured Projects
					<span className="flex-1 h-[1px] bg-[var(--grid-accent)] ml-4" />
				</h2>

				<div className="grid-3">
					{PROJECTS.filter(p => p.featured).map((project) => (
						<ProjectCard key={project.id} {...project} />
					))}
				</div>
			</section>

			{/* Technical Skills */}
			<section className="section">
				<h2 className="text-heading text-3xl mb-8 flex items-center gap-4">
					<span className="text-secondary">{"//"}</span>
					Technical Stack
					<span className="flex-1 h-[1px] bg-[var(--grid-accent)] ml-4" />
				</h2>

				<div className="grid-2">
					<div className="data-box">
						<h3 className="text-data text-accent mb-4">{'>'} Languages</h3>
						<div className="flex flex-wrap gap-2">
							{['TypeScript', 'Python', 'C++', 'LaTeX'].map((skill) => (
								<span key={skill} className="text-data text-sm px-3 py-1 border border-[var(--grid-color)]">
									{skill}
								</span>
							))}
						</div>
					</div>

					<div className="data-box">
						<h3 className="text-data text-secondary mb-4">{'>'} Frameworks</h3>
						<div className="flex flex-wrap gap-2">
							{['Tensorflow', 'Genesis', 'Django', 'Numpy', 'Matplotlib'].map((skill) => (
								<span key={skill} className="text-data text-sm px-3 py-1 border border-[var(--grid-color)]">
									{skill}
								</span>
							))}
						</div>
					</div>

					<div className="data-box">
						<h3 className="text-data text-highlight mb-4">{'>'} Infrastructure</h3>
						<div className="flex flex-wrap gap-2">
							{['Workers', 'Docker', 'Linux'].map((skill) => (
								<span key={skill} className="text-data text-sm px-3 py-1 border border-[var(--grid-color)]">
									{skill}
								</span>
							))}
						</div>
					</div>

					<div className="data-box">
						<h3 className="text-data text-[var(--ikeda-green)] mb-4">{'>'} Tools</h3>
						<div className="flex flex-wrap gap-2">
							{['Onshape', 'KiCAD', 'Arduino', 'Adobe Suite'].map((skill) => (
								<span key={skill} className="text-data text-sm px-3 py-1 border border-[var(--grid-color)]">
									{skill}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
		</PaletteProvider>
	);
}

// Stat Box Component
function StatBox({ label, value }: { label: string; value: string }) {
	return (
		<div className="data-box text-center">
			<div className="text-4xl text-accent mb-2">{value}</div>
			<div className="text-data text-sm">{label}</div>
		</div>
	);
}