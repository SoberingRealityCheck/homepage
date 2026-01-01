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
		targetWidth={600}
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
					<span className="text-data text-accent">2025-2026</span>
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
					<p>Ongoing</p>
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
					OWLSAT is a Rice student organization focused on the development of a CubeSat mission to study Extreme Ultraviolet (EUV) radiation in Low Earth Orbit (LEO). The primary scientific objective of OWLSAT is to measure these radiation levels to better understand their impact on satellite operations and space weather phenomena. As one of only 3-4 software team members, I contributed to the development of the satellite&apos;s embedded microcontroller task-handling framework and navigated challenges brought on by unexpected NASA funding cuts and personnel changes. 
				</p>
			</div>

			{/* Background section with side images */}
			<div className="content-block flex gap-6">
				<div className="flex-[8] blog-content whitespace-pre-line">
					<h2>Background</h2>
					<p>
						This is a long-running project at Rice, with previous iterations and teams dating back several years. The graduation of the initial team of grad student designers led to the project being recently revived by a new group of undergraduates. As part of this new, small but passionate team, I have been working on developing the software systems necessary for the CubeSat&apos;s On-Board Computer (OBC). Our team is responsible for designing, implementing, and testing the flight software that will manage the satellite&apos;s operations, data handling, and communication with our ground station.
					</p>
					<p>
						I joined OWLSAT in early 2025, attracted by the opportunity to work on a real-world space mission and contribute to the growing field of small satellite technology. I&apos;ve been excited about space technology since I was a kid, and the chance to actually help design and build a satellite was something I couldn&apos;t pass up. The project also aligned well with my past experience in engineering and embedded software development.
					</p>
					
					<p>
						My specific contributions have included setting up the initial framework for asynchronous task management on the OBC, given that it&apos;s a single-threaded microcontroller environment with limited resources. After extensive research, I decided on utilizing CircuitPython&apos;s Tasko libary due to its lightweight nature and convenience of use (much of our team are new programmers, and CircuitPython is very beginner-friendly). This has allowed us to efficiently manage multiple concurrent tasks, such as sensor data acquisition, data storage, and communication with the ground station, all while adhering to the strict timing requirements of satellite operations.
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
						The primary scientific objective of the OWLSAT mission is to measure EUV radiation levels in Low Earth Orbit. This topic is of particular interest due to EUV radiation&apos;s effects on satellite materials and electronics, as well as its role in space weather dynamics. Understanding these radiation levels is crucial for the design and operation of future satellite missions, especially as the number of satellites in orbit continues to grow.
						</p>
						<p>
							<strong>Primary Goals:</strong> The mission&apos;s primary goal is to sit in a stable orbit and collect accurate measurements of EUV radiation intensity over time, while also monitoring the satellite&apos;s health and status.
						</p>
						<p>
							<strong>Technical Requirements:</strong> The satellite must be capable of autonomous operation, including data acquisition, storage, and transmission to the ground station. The flight software must efficiently manage limited resources, handle potential faults, and ensure reliable communication. In event of communication loss, the satellite should be able to store data onboard and transmit it once the link is re-established.
						</p>
						<p>
							<strong>Success Criteria:</strong> The mission will be considered successful if it can consistently collect and transmit EUV radiation data over its operational lifespan, while maintaining the health and functionality of its onboard systems. It is challenging and intimidating to design a system that must operate flawlessly in the challenging environment of space, but I was eager to take on the challenge and learn as much as I could through the process.
						</p>
					</div>
				</div>
			</div>

			{/* Technical Design */}
			<div className="flex content-block-highlight blog-content">
				<div className="flex-[2] mr-6">
					<h2>CubeSat Design</h2>
					<p>
						The satellite is built around a standard 3U CubeSat form factor, measuring 10x10x30 cm. It houses several key subsystems, including the OBC, power system, communication system, and the scientific payload for EUV measurement.
					</p>
					<p>
						The OBC was originally intended to utilize the open-source Pycubed board, but due to the board&apos;s extreme vulnerability to space radiation, we pivoted to a custom RP2350 board. We then discovered the recently-released <a href="https://nyansat.org/blog/cpb-and-obc-opensource/" style={{color: 'cyan'}}><u>NyanSat</u></a> platform, which we intend to slightly modify for our own hardware needs but largely base our softwrae development around. This board utilizes the RP2350 microcontroller, which is well-suited for student space applications due to its low power consumption, radiation tolerance, and wide multitude of development board options.
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
					I worked on the selection, integration, and development of the task handling system for the OBC software. Given the constraints of the microcontroller environment, I researched various lightweight task management libraries and settled on CircuitPython&apos;s Tasko library due to its simplicity and effectiveness for our needs. I helped integrate and test Tasko with our RP2350 development board, writing template high-level pseudocode for various satellite functions such as sensor data acquisition, data storage, and communication handling.
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
			</div>

			{/* Testing section with images */}
			<div className="content-block blog-content">
				<h2>Unexpected Issues</h2>
				
				<div className="flex gap-6 my-8">
					<div className="flex-[3] blog-content">
						<h3>Loss of Funding</h3>
						<p>
							One of the unexpected challenges we faced during the project was the sudden loss of our launch window due to NASA cutting funding for student CubeSat launches. This forced us to reevaluate our project timeline and objectives, as we had to delay our planned launch and seek alternative funding sources for a private launch. It was a difficult setback, but it also taught us the importance of adaptability and resilience in project management.
						</p>

						<p>
							An unexpected role I found myself in was researching and reaching out to private launch providers to inquire about potential opportunities for launching our CubeSat and/or quotes for launch costs. This was a fairly different role than I&apos;d anticipated taking on, but I was happy to help the team in any way I could given the circumstances.
						</p>

						<h3>Loss of Personnel</h3>
						<p>
							Another significant challenge we encountered was the sudden departure of the founding members due to personal commitments. This left our team without any experienced leadership, forcing us to go back through old documentation and piece together the project&apos;s history and current status. It was a daunting task, but it also provided an opportunity for the remaining team members to step up and take on leadership roles, fostering a strong sense of camaraderie and shared responsibility. We&apos;ve since been able to recruit some new members to help fill the gaps, and the team is slowly but surely regaining momentum.
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
					Currently, the project is in a bit of a rebuilding phase after the setbacks we&apos;ve faced. However, we&apos;ve made significant progress in reestablishing our team structure, refining our mission objectives, and continuing the development of our flight software. My contributions to the task management system have laid a solid foundation for the OBC software, and I&apos;m excited to see how it will evolve as we move closer to our eventual launch. We&apos;ve gathered a lot of new members recently who are enthusiastic about the potential of the project, and I believe we have a strong chance of successfully launching OWLSAT in the near future.
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
							While this is certainly not the outcome I&apos;d initially envisioned when joining the project, I&apos;m proud of the resilience and determination our team has shown in the face of adversity. The experience has taught me valuable lessons in adaptability, teamwork, and problem-solving that I&apos;ll carry with me in my future endeavors.
						</p>
						<h3>Key Achievements:</h3>
						<ul>
							<li>- Successfully developed and implemented a task management system for the OBC software.</li>
							<li>- Navigated years of old club documentation to understand the reasoning behind design decisions and how to improve upon flawed systems.</li>
							<li>- Researched CubeSat private launch opportunities and costs. Obtained preliminary quotes and established contacts with several providers.</li>
							<li>- Overcame significant team challenges including loss of founding members and rebuilding team structure.</li>
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
					One of the biggest lessons I learned from this project was that real-world engineering projects rarely go as planned. The setbacks we faced had little to do with actual engineering challenges, and more to do with factors beyond our control like NASA&apos;s funding. It taught me the importance of adaptability and resilience in project management, as well as the value of a strong team culture to weather unexpected challenges. I also learned a substantial amount about embedded systems programming and the unique constraints of space systems and radio communications, which has broadened my technical skill set significantly.
				</p>
			</div>
		</div>
	</div>
</PaletteProvider>
	);
}
