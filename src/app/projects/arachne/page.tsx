// README: How to Add New Projects
// 
// This portfolio uses a simple, class-based system for styling.
// Follow these steps to add a new project page:
//
// 1. Create a new folder in src/app/projects/your-project-name/
// 2. Add a page.tsx file with the structure below
// 3. Update src/app/projects/page.tsx to add your project to the grid
//
// PALETTE SYSTEM:
// Wrap your page in PaletteProvider to use custom colors:
//
// 'use client';
// import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';
//
// export default function YourPage() {
//   return (
//     <PaletteProvider palette={IKEDA_PALETTES.infrared}>
//       {/* Your content - all color classes auto-update! */}
//     </PaletteProvider>
//   );
// }
//
// Available palettes: classic, infrared, dataBlue, electric, neon, monochrome, sunset, arctic
//
// IMAGE PROCESSING:
// Use IkedaImage component for automatic dithering:
//
// import { IkedaImage } from '@/utils/ikedaImage';
//
// <IkedaImage 
//   src="/your-image.jpg"
//   palette={IKEDA_PALETTES.electric}
//   alt="Description"
//   ditherMethod="atkinson"
//   className="w-full"
// />
//
// Available utility classes:
//
// LAYOUT CLASSES:
// - section: Main content wrapper with padding
// - section-tight: Less padding
// - section-wide: Full width section
// - grid-2: 2-column responsive grid
// - grid-3: 3-column responsive grid
//
// CONTENT BLOCKS:
// - content-block: Standard dark container
// - content-block-highlight: Container with accent border
// - data-box: Smaller info box
// - data-box-accent: Info box with red accent
//
// TYPOGRAPHY:
// - text-display: Large heading (3rem)
// - text-heading: Section heading (uppercase, mono)
// - text-data: Small data labels (mono, uppercase)
// - text-accent: Uses palette color 1 (or red by default)
// - text-secondary: Uses palette color 2 (or cyan by default)
// - text-highlight: Uses palette color 3 (or orange by default)
//
// COMPONENTS:
// - project-card: Hoverable project card
// - data-stripe: Colorful horizontal stripe (uses current palette)
// - line-accent: Accent horizontal line
// - line-grid: Gray horizontal line
//
// BLOG CONTENT:
// - blog-content: Wrap your content in this class for automatic styling of h1, h2, h3, p, ul, ol, code, pre, blockquote

export default function ProjectTemplate() {
	return (
		<div className="section">
			{/* Project Header - Always include this */}
			<div className="content-block-highlight mb-8">
				<div className="flex justify-between items-start mb-4">
					<h1 className="text-display text-4xl">Your Project Name</h1>
					<span className="text-data text-accent">2024</span>
				</div>
				<div className="data-stripe mb-6" />
				<p className="text-xl text-gray-300 leading-relaxed">
					One-line description of your project
				</p>
			</div>

			{/* Optional: Project Info Grid */}
			<div className="grid-3 mb-12">
				<div className="data-box">
					<h3 className="text-data text-accent mb-2">Role</h3>
					<p>Your Role</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-secondary mb-2">Timeline</h3>
					<p>Duration</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-highlight mb-2">Status</h3>
					<p>Status</p>
				</div>
			</div>

			{/* Main Content - Wrap in blog-content for automatic styling */}
			<div className="content-block blog-content">
				<h2>Section Heading</h2>
				<p>
					Your paragraph content here. The blog-content class automatically styles all HTML elements
					with the Ikeda aesthetic.
				</p>

				<h3>Subsection</h3>
				<p>More content here.</p>

				<ul>
					<li>List item 1</li>
					<li>List item 2</li>
					<li>List item 3</li>
				</ul>

				<h2>Code Example</h2>
				<pre><code>const example = &quot;Your code here&quot;;
console.log(example);</code></pre>

				<blockquote>
					Quotes are automatically styled with an accent border.
				</blockquote>

				{/* You can also add custom grid layouts within blog-content */}
				<h2>Two-Column Layout Example</h2>
				<div className="grid-2">
					<div className="data-box">
						<h4 className="text-data text-accent mb-3">Left Column</h4>
						<p>Content here</p>
					</div>
					<div className="data-box">
						<h4 className="text-data text-secondary mb-3">Right Column</h4>
						<p>Content here</p>
					</div>
				</div>
			</div>

			{/* Optional: Additional highlighted section */}
			<div className="content-block-highlight mt-8 blog-content">
				<h2>Results & Impact</h2>
				<p>Highlight your achievements and impact here.</p>
			</div>
		</div>
	);
}
