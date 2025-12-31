'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';

export default function AboutPage() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.homepage}>
			<div className="section">
			<div className="mb-12">
				<h1 className="text-display mb-4">
					<span className="text-secondary">{'>'}</span> About
				</h1>
				<div className="data-stripe" />
			</div>

			<div className="grid md:grid-cols-3 gap-8">
				<div className="md:col-span-2">
					<div className="content-block blog-content">
						<h2>Background</h2>
						<p>
							I&apos;m a software engineer specializing in data-intensive applications, distributed systems, and
							machine learning infrastructure. With a focus on building scalable, reliable solutions that
							process and visualize complex data.
						</p>

						<h2>Expertise</h2>
						<p>
							My work spans full-stack development, data engineering, and DevOps. I&apos;m passionate about
							creating systems that are not only functional but also maintainable and performant at scale.
						</p>

						<h3>Focus Areas</h3>
						<ul>
							<li>Real-time data processing and streaming architectures</li>
							<li>Interactive data visualization and analytics platforms</li>
							<li>Machine learning model deployment and MLOps</li>
							<li>Cloud infrastructure and containerization</li>
						</ul>

						<h2>Philosophy</h2>
						<p>
							I believe in writing clean, well-documented code and building systems with observability
							built-in from the start. Every project is an opportunity to learn new technologies and
							refine best practices.
						</p>
					</div>
				</div>

				<div>
					<div className="data-box-accent mb-6">
						<h3 className="text-data text-accent mb-4">Contact</h3>
						<div className="space-y-2 text-sm">
							<p>
								<span className="text-gray-500">Email:</span>
								<br />
								<a href="mailto:hello@example.com" className="link">
									hello@example.com
								</a>
							</p>
							<p>
								<span className="text-gray-500">GitHub:</span>
								<br />
								<a href="https://github.com" target="_blank" rel="noopener noreferrer" className="link">
									github.com/username
								</a>
							</p>
							<p>
								<span className="text-gray-500">LinkedIn:</span>
								<br />
								<a
									href="https://linkedin.com"
									target="_blank"
									rel="noopener noreferrer"
									className="link"
								>
									linkedin.com/in/username
								</a>
							</p>
						</div>
					</div>

					<div className="data-box">
						<h3 className="text-data text-secondary mb-4">Currently</h3>
						<ul className="space-y-2 text-sm">
							<li>Building distributed systems</li>
							<li>Exploring edge computing</li>
							<li>Contributing to open source</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		</PaletteProvider>
	);
}
