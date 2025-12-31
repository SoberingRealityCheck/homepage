'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';
import { IkedaImage } from '@/utils/ikedaImage';

export default function ImageProcessingDemo() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.electric}>
			<div className="section">
				<div className="content-block-highlight mb-8">
					<div className="flex justify-between items-start mb-4">
						<h1 className="text-display text-4xl">Image Processing</h1>
						<span className="text-data text-accent">Ikeda Dithering</span>
					</div>
					<div className="data-stripe mb-6" />
					<p className="text-xl text-gray-300 leading-relaxed">
						Automatic image dithering with palette-based color replacement
					</p>
				</div>

				<div className="content-block blog-content">
					<h2>Ikeda Image Component</h2>
					<p>
						The IkedaImage component automatically processes images using dithering algorithms and
						replaces colors with your chosen palette. This creates the high-contrast, data-visualization
						aesthetic characteristic of Ryoji Ikeda's work.
					</p>

					<h3>Usage Example</h3>
					<pre><code>{`import { IkedaImage } from '@/utils/ikedaImage';
import { IKEDA_PALETTES } from '@/utils/palette';

<IkedaImage 
  src="/your-image.jpg"
  palette={IKEDA_PALETTES.electric}
  alt="Description"
  ditherMethod="atkinson"
  className="w-full"
/>`}</code></pre>

					<h2>Dithering Methods</h2>
					<div className="grid-3 my-8">
						<div className="data-box">
							<h4 className="text-data text-accent mb-3">Floyd-Steinberg</h4>
							<p className="text-sm">
								Classic error diffusion algorithm. Creates smooth gradients with detailed patterns.
							</p>
						</div>
						<div className="data-box">
							<h4 className="text-data text-secondary mb-3">Atkinson</h4>
							<p className="text-sm">
								High-contrast dithering. Recommended for Ikeda aesthetic. Creates bold, graphic results.
							</p>
						</div>
						<div className="data-box">
							<h4 className="text-data text-highlight mb-3">Ordered</h4>
							<p className="text-sm">
								Bayer matrix dithering. Creates regular geometric patterns. Good for technical look.
							</p>
						</div>
					</div>

					<h2>How It Works</h2>
					<ol>
						<li>
							<strong>Contrast Boost:</strong> Increases image contrast for more dramatic results
						</li>
						<li>
							<strong>Grayscale Conversion:</strong> Converts image to monochrome
						</li>
						<li>
							<strong>Dithering:</strong> Applies selected algorithm to create halftone effect
						</li>
						<li>
							<strong>Palette Mapping:</strong> Maps to 4 levels - black + your 3 palette colors
						</li>
					</ol>

					<h2>Processing Function</h2>
					<p>You can also use the processing function directly:</p>

					<pre><code>{`import { processIkedaImage } from '@/utils/ikedaImage';

const dataUrl = await processIkedaImage(
  '/image.jpg',
  IKEDA_PALETTES.electric,
  {
    ditherMethod: 'atkinson',
    threshold: 128,
    contrastBoost: 1.5
  }
);`}</code></pre>

					<h2>Options</h2>
					<ul>
						<li>
							<strong>ditherMethod:</strong> 'floyd-steinberg' | 'atkinson' | 'ordered'
						</li>
						<li>
							<strong>threshold:</strong> 0-255, controls black/white cutoff
						</li>
						<li>
							<strong>contrastBoost:</strong> Multiplier for contrast enhancement (default: 1.5)
						</li>
					</ul>

					<blockquote>
						The Atkinson method produces results most similar to Ikeda's Dataverse aesthetic, with sharp
						contrasts and geometric patterns.
					</blockquote>
				</div>

				<div className="content-block-highlight mt-8">
					<h2 className="text-heading text-2xl mb-4">Try It Yourself</h2>
					<p className="mb-4">
						Place any image in your <code>public</code> folder and use the IkedaImage component to
						automatically process it with your chosen palette and dithering method.
					</p>
					<div className="data-stripe" />
				</div>
			</div>
		</PaletteProvider>
	);
}
