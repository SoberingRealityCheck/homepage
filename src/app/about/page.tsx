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
							I&apos;m a student at Rice University pursuing a B.S. in Computational Physics with a minor in Engineering Design. I&apos;m interested in robotics and space technology, particularly involving systems that can learn and develop over time.
						</p>

						<h2>Expertise</h2>
						<p>
							My work spans physics, computer science, and engineering. I have experience in physics research, engineering design projects, and software development, with an overarching focus on machine learning and sensor data processing.
						</p>

						<h3>Focus Areas</h3>
						<ul>
							<li>robots, man</li>
							<li>cool systems that learn shit</li>
							<li>jazz piano idk</li>
							<li>hell yeah</li>
							<li>hell yeah</li>
						</ul>

						<h2>Philosophy</h2>
						<p>
							i have that
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
								<a href="mailto:clayton.goldsmith@rice.edu" className="link">
									clayton.goldsmith@rice.edu
								</a>
							</p>
							<p>
								<span className="text-gray-500">GitHub:</span>
								<br />
								<a href="https://github.com/soberingrealitycheck" target="_blank" rel="noopener noreferrer" className="link">
									github.com/soberingrealitycheck
								</a>
							</p>
							<p>
								<span className="text-gray-500">LinkedIn:</span>
								<br />
								<a
									href="https://linkedin.com/in/spaceclay"
									target="_blank"
									rel="noopener noreferrer"
									className="link"
								>
									linkedin.com/in/spaceclay
								</a>
							</p>
						</div>
					</div>

					<div className="data-box">
						<h3 className="text-data text-secondary mb-4">Currently</h3>
						<ul className="space-y-2 text-sm">
							<li>Building awesome robots</li>
							<li>Trying not to fail quantum physics</li>
							<li>Solving real-world problems</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		</PaletteProvider>
	);
}
