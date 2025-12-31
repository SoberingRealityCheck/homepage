'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';

export default function InfraredPalettePage() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.infrared}>
			<div className="section">
				<div className="content-block-highlight mb-8">
					<div className="flex justify-between items-start mb-4">
						<h1 className="text-display text-4xl">Infrared Vision</h1>
						<span className="text-data text-accent">Custom Palette</span>
					</div>
					<div className="data-stripe mb-6" />
					<p className="text-xl text-gray-300 leading-relaxed">
						Example page using the Infrared color palette
					</p>
				</div>

				<div className="content-block blog-content">
					<h2>Custom Palette Applied</h2>
					<p>
						This page demonstrates the palette system. Notice how all accent colors (text-accent,
						text-secondary, text-highlight) automatically use the Infrared palette colors.
					</p>

					<div className="grid-3 my-8">
						<div className="data-box-accent">
							<h3 className="text-data text-accent mb-2">Color 1</h3>
							<p className="text-accent text-2xl font-bold">#ff0066</p>
						</div>
						<div className="data-box-accent">
							<h3 className="text-data text-secondary mb-2">Color 2</h3>
							<p className="text-secondary text-2xl font-bold">#ff3366</p>
						</div>
						<div className="data-box-accent">
							<h3 className="text-data text-highlight mb-2">Color 3</h3>
							<p className="text-highlight text-2xl font-bold">#ff6699</p>
						</div>
					</div>

					<h2>How to Use</h2>
					<p>Wrap your page content in a PaletteProvider to apply custom colors:</p>

					<pre><code>{`import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';

export default function YourPage() {
  return (
    <PaletteProvider palette={IKEDA_PALETTES.infrared}>
      {/* Your content here */}
    </PaletteProvider>
  );
}`}</code></pre>

					<h2>Available Palettes</h2>
					<ul>
						<li>
							<strong>classic</strong> - Red, Cyan, Orange (default)
						</li>
						<li>
							<strong>infrared</strong> - Pink/Red variations
						</li>
						<li>
							<strong>dataBlue</strong> - Blue spectrum
						</li>
						<li>
							<strong>electric</strong> - Green, Cyan, Yellow
						</li>
						<li>
							<strong>neon</strong> - Magenta, Cyan, Yellow
						</li>
						<li>
							<strong>monochrome</strong> - White/Gray variations
						</li>
						<li>
							<strong>sunset</strong> - Orange/Red gradient
						</li>
						<li>
							<strong>arctic</strong> - Cyan/Blue variations
						</li>
					</ul>

					<h2>Affected Elements</h2>
					<p>The palette system automatically updates:</p>
					<ul>
						<li>All <code>text-accent</code> classes</li>
						<li>All <code>text-secondary</code> classes</li>
						<li>All <code>text-highlight</code> classes</li>
						<li>
							<code>data-stripe</code> gradient
						</li>
						<li>Border colors on hover effects</li>
						<li>Button hover states</li>
					</ul>
				</div>
			</div>
		</PaletteProvider>
	);
}
