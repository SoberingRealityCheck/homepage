'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';
import { ProjectCard } from '@/components/ProjectCard';
import { PROJECTS } from '@/data/projects';

export default function ProjectsPage() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.monochrome}>
			<div className="section">
			<div className="mb-12">
				<h1 className="text-display mb-4">
					<span className="text-accent">{'>'}</span> Projects
				</h1>
				<div className="data-stripe" />
				<p className="text-xl mt-6 text-gray-300">
					A collection of projects spanning robotics, physics, and machine learning.
				</p>
			</div>

			{/* Projects Grid */}
			<div className="grid-2">
				{PROJECTS.map((project) => (
					<ProjectCard key={project.id} {...project} />
				))}
			</div>
		</div>
		</PaletteProvider>
	);
}
