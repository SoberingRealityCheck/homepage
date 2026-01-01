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
							<li>Machine Learning</li>
							<li>Robotics</li>
							<li>Space Technology</li>
							<li>Engineering Design</li>
							<li>Particle Physics</li>
						</ul>

						<h2>Philosophy</h2>
						<p>
							I want to build technology that makes a positive impact on the world, and I want to keep learning and growing as a person along the way. I believe in the importance of continuous improvement - I seek out challenges that push me to develop new skills and perspectives. 
							
							<br />
							<br />

							I believe that innovation comes from understanding a problem at a fundamental level - this is what led me to study physics despite my long-term interests in engineering and technology. By understanding the underlying principles, I can create solutions that are not only effective but also elegant and efficient.

							<br />
							<br />

							Most of all, though, I believe that the biggest obstacle to achieving great things is the belief that one lacks the required skills or expertise to do so. I&apos;m a big believer in starting first, learning what I need to along the way, and iterating towards success.
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
