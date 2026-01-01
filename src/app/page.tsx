'use client';

import Link from 'next/link';
import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';
import { ProjectCard } from '@/components/ProjectCard';
import { PROJECTS } from '@/data/projects';
import { IkedaImage } from '@/utils/ikedaImage';

export default function Home() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.homepage}>
		<div className="relative overflow-hidden">
			{/* Background image layer */}
			<div className="flex items-center justify-center min-h-screen fixed inset-0 z-0 ml-0 md:ml-[300px] lg:ml-[500px]">
			<IkedaImage
				src="/home/me.png" 
				palette={IKEDA_PALETTES.homeimg}
				alt="Background"
				ditherMethod="atkinson"
				className="w-[90%] h-[90vh] mx-auto object-contain opacity-40"
				brightnessAdjust={12.0}
				targetWidth={800}
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

			<p className="text-base md:text-xl max-w-2xl mb-8 leading-relaxed whitespace-pre-line">
					Rice University, Class of 2027 
			<br /> 
			B.S. in Computational Physics, Minor in Engineering Design.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 mt-4">
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
			<section className="section no-print">
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
							{['Cloudflare', 'Docker', 'Linux'].map((skill) => (
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
				<div className="data-stripe-colorless mt-8" />
				<div className="text-sm text-gray-400 mt-4 no-print">
					This site was built using Next.js and TypeScript. Hosted on Cloudflare Workers. Design was lightly inspired by Ryoji Ikeda&apos;s Dataverse series, which is super cool and something I highly recommend checking out.
				</div>
			</section>
		</>
		<div className="h-32" /> {/* Spacer at bottom */}
	</div>
		</PaletteProvider>
	);
}