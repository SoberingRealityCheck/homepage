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

'use client';

import { PaletteProvider, IKEDA_PALETTES } from "@/utils/palette";
import { IkedaImage } from "@/utils/ikedaImage";
import Image from "next/image";

export default function OwlsatPage() {
	return (
<PaletteProvider palette={IKEDA_PALETTES.owlsat}>
	{/* Background image layer */}
	<div className="flex items-center justify-center min-h-screen fixed inset-0 z-0">
	<IkedaImage
		src="/owlsat/owlsat.png"
		palette={IKEDA_PALETTES.owlsat}
		alt="Background"
		ditherMethod="ordered"
		className="w-[90%] h-[90vh] mx-auto object-contain opacity-40"
		showDebug={false}
	/>
	</div>

	{/* Content layer */}
	<div className="relative z-10">
		{/* Spacer to view full image */}
		<div className="h-[50vh]" />
		
		<div className="section">
			{/* Project Header */}
			<div className="content-block-highlight mb-8">
				<div className="flex justify-between items-start mb-4">
					<h1 className="text-display text-4xl">OWLSAT CubeSat Mission</h1>
					<span className="text-data text-accent">2025</span>
				</div>
				<div className="data-stripe mb-6" />
				<p className="text-xl text-gray-300 leading-relaxed">
					Development of a NASA-supported CubeSat mission for studying Extreme-UV Radiation in Low Earth Orbit.
				</p>
			</div>

			{/* Project Info Grid */}
			<div className="grid-3 mb-12">
				<div className="data-box">
					<h3 className="text-data text-accent mb-2">Role</h3>
					<p>Software Member</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-secondary mb-2">Timeline</h3>
					<p>January - November 2025</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-highlight mb-2">Status</h3>
					<p>Concluded</p>
				</div>
			</div>

			{/* Optional showcase image/video */}
			{/* <div className="image-gallery my-8">
				<div className="gallery-item">
					<div className="image-wrapper">
						<Image src="/owlsat/showcase.png" alt="OWLSAT CubeSat" fill style={{objectFit: "cover"}} />
					</div>
					<div className="gallery-item-caption">
						OWLSAT CubeSat mission overview
					</div>
				</div>
			</div> */}

			{/* Main Content */}
			<div className="content-block-highlight blog-content whitespace-pre-wrap">
				<h2>Project Description</h2>
				<p>
					[Add your project description here - explain what OWLSAT is, your role, and the mission objectives]
				</p>
			</div>

			{/* Background section with side images */}
			<div className="content-block flex gap-6">
				<div className="flex-[8] blog-content whitespace-pre-line">
					<h2>Background</h2>
					<p>
						[Explain the context and motivation for the OWLSAT mission]
					</p>
					<p>
						[Add details about the scientific goals and why studying EUV radiation is important]
					</p>
					<p>
						[Discuss the challenges or opportunities this mission addresses]
					</p>
				</div>
				
				{/* Optional side images */}
				{/* <div className="image-gallery flex-[1.5]">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/owlsat/image1.png" alt="Description" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							Caption text
						</div>
					</div>
				</div>
				<div className="image-gallery flex-[1.5]">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/owlsat/image2.png" alt="Description" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							Caption text
						</div>
					</div>
				</div> */}
			</div>

			{/* Mission Objectives / Technical Requirements */}
			<div className="content-block blog-content">
				<h2>Mission Objectives</h2>
				
				<div className="flex justify-center my-6">
					{/* Optional side image */}
					{/* <div className="image-gallery flex-[3]">
						<div className="gallery-item">
							<div className="image-wrapper">
								<Image src="/owlsat/diagram.png" alt="Mission diagram" fill style={{objectFit: "cover"}} />
							</div>
							<div className="gallery-item-caption">
								Mission architecture
							</div>
						</div>
					</div> */}
					<div className="flex-[8] ml-6 blog-content whitespace-pre-line">
						<p>
							[Describe the primary scientific objectives]
						</p>
						<p>
							<strong>Primary Goals:</strong> [List main mission goals and what you&apos;re measuring/studying]
						</p>
						<p>
							<strong>Technical Requirements:</strong> [Describe technical constraints, orbit requirements, payload specifications]
						</p>
						<p>
							<strong>Success Criteria:</strong> [What defines mission success, data requirements, operational duration]
						</p>
					</div>
				</div>
			</div>

			{/* Technical Design */}
			<div className="flex content-block-highlight blog-content">
				<div className="flex-[2] mr-6">
					<h2>CubeSat Design</h2>
					<p>
						[Describe the overall satellite design and architecture]
					</p>
					<p>
						[Explain key subsystems: payload, communications, power, attitude control, etc.]
					</p>
					<p>
						[Detail your specific contributions to the software/systems]
					</p>
				</div>
				{/* Optional side image */}
				{/* <div className="flex-[1] ml-6 image-gallery">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/owlsat/design.png" alt="CubeSat design" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							CubeSat system diagram
						</div>
					</div>
				</div> */}
			</div>

			{/* Software Development */}
			<div className="content-block-highlight blog-content">
				<h2>Software & Systems Development</h2>
				<p>
					[Describe the software systems you worked on]
				</p>
				
				{/* Optional large image */}
				{/* <div className="image-gallery">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/owlsat/software.png" alt="Software architecture" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							Software architecture diagram
						</div>
					</div>
				</div> */}

				<div className="content-block blog-content">
					<h3>Flight Software</h3>
					<p>
						[Describe the onboard software you developed - real-time systems, data handling, etc.]
					</p>
				</div>

				<div className="content-block blog-content">
					<h3>Ground Systems</h3>
					<p>
						[Describe ground station software, telemetry processing, mission operations tools]
					</p>
				</div>

				<div className="content-block blog-content">
					<h3>Testing & Validation</h3>
					<p>
						[Describe testing procedures, simulation environments, validation processes]
					</p>
				</div>
			</div>

			{/* Testing section with images */}
			<div className="content-block blog-content">
				<h2>Integration & Testing</h2>
				
				<div className="flex gap-6 my-8">
					<div className="flex-[3] blog-content">
						<h3>[Test Category 1]</h3>
						<p>
							[Describe specific tests performed and results]
						</p>

						<h3>[Test Category 2]</h3>
						<p>
							[More testing details]
						</p>
					</div>

					{/* Optional side image */}
					{/* <div className="image-gallery flex-[2]">
						<div className="gallery-item">
							<div className="image-wrapper">
								<Image src="/owlsat/testing.png" alt="Testing" fill style={{objectFit: "cover"}} />
							</div>
							<div className="gallery-item-caption">
								Integration and testing
							</div>
						</div>
					</div> */}
				</div>
			</div>

			{/* Outcomes */}
			<div className="content-block-highlight mt-8 blog-content">
				<h2>Project Outcomes</h2>
				<p>
					[Summarize the final state of the project and your contributions]
				</p>
				
				{/* Optional large image */}
				{/* <div className="image-gallery my-6">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/owlsat/final.png" alt="Final system" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							Final integrated system
						</div>
					</div>
				</div> */}
				
				<div className="flex">
					<div className="flex-[4] mr-6">
						<p>
							[Reflect on what you learned and the impact of your work]
						</p>
						<h3>Key Achievements:</h3>
						<ul>
							<li>- [Achievement 1]</li>
							<li>- [Achievement 2]</li>
							<li>- [Achievement 3]</li>
							<li>- [Achievement 4]</li>
						</ul>
					</div>
					{/* Optional side image */}
					{/* <div className="flex-[1] ml-6 image-gallery">
						<div className="gallery-item">
							<div className="image-wrapper">
								<Image src="/owlsat/team.png" alt="Team photo" fill style={{objectFit: "cover"}} />
							</div>
							<div className="gallery-item-caption">
								OWLSAT team
							</div>
						</div>
					</div> */}
				</div>

				<h3>Lessons Learned</h3>
				<p>
					[Discuss key lessons from the project]
				</p>
			</div>
		</div>
	</div>
</PaletteProvider>
	);
}
