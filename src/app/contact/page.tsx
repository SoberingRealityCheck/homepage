'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';

export default function ContactPage() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.homepage}>
			<div className="section">
			<div className="mb-12">
				<h1 className="text-display mb-4">
					<span className="text-highlight">{'>'}</span> Contact
				</h1>
				<div className="data-stripe" />
				<p className="text-xl mt-6 text-gray-300">Let&apos;s connect and discuss your next project.</p>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<div className="content-block">
					<h2 className="text-heading text-2xl mb-6">Get In Touch</h2>

					<div className="space-y-6">
						<div className="data-box">
							<h3 className="text-data text-accent mb-2">Email</h3>
							<a href="mailto:hello@example.com" className="link text-lg">
								hello@example.com
							</a>
						</div>

						<div className="data-box">
							<h3 className="text-data text-secondary mb-2">GitHub</h3>
							<a
								href="https://github.com/username"
								target="_blank"
								rel="noopener noreferrer"
								className="link text-lg"
							>
								github.com/username
							</a>
						</div>

						<div className="data-box">
							<h3 className="text-data text-highlight mb-2">LinkedIn</h3>
							<a
								href="https://linkedin.com/in/username"
								target="_blank"
								rel="noopener noreferrer"
								className="link text-lg"
							>
								linkedin.com/in/username
							</a>
						</div>
					</div>
				</div>

				<div className="content-block-highlight">
					<h2 className="text-heading text-2xl mb-6">Availability</h2>
					<p className="mb-4 leading-relaxed">
						Currently available for freelance projects and consulting opportunities. Interested in:
					</p>
					<ul className="space-y-2 mb-6">
						<li>• Full-stack web development</li>
						<li>• Data pipeline architecture</li>
						<li>• System design consultation</li>
						<li>• Technical advisory</li>
					</ul>
					<div className="data-stripe" />
					<p className="mt-6 text-sm text-gray-400">Response time: Usually within 24 hours</p>
				</div>
			</div>
		</div>
		</PaletteProvider>
	);
}
