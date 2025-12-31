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

export default function RiceRoboticsPage() {
	return (
<PaletteProvider palette={IKEDA_PALETTES.robotics}>
	{/* Background image layer */}
	<div className="flex items-center justify-center min-h-screen fixed inset-0 z-0">
	<IkedaImage
		src="/robotics/servobot.png"
		palette={IKEDA_PALETTES.robotics}
		alt="Background"
		ditherMethod="atkinson"
		className="w-[90%] h-[90vh] mx-auto object-contain opacity-40"
		showDebug={false}
		brightnessAdjust={5}
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
					<h1 className="text-display text-4xl">Rice Robotics R&D</h1>
					<span className="text-data text-accent">2025 - 2026</span>
				</div>
				<div className="data-stripe mb-6" />
				<p className="text-xl text-gray-300 leading-relaxed">
					Reinforcement-Learned gait optimization for a laser-pointer-controlled feline quadruped robot.
				</p>
			</div>

			{/* Project Info Grid */}
			<div className="grid-3 mb-12">
				<div className="data-box">
					<h3 className="text-data text-accent mb-2">Role</h3>
					<p>Software Co-Lead</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-secondary mb-2">Timeline</h3>
					<p>August 2025 - May 2026</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-highlight mb-2">Status</h3>
					<p>Ongoing</p>
				</div>
			</div>

			{/* Optional showcase video/image */}
			{/* <div className="image-gallery my-8">
				<div className="gallery-item">
					<div className="image-wrapper">
						<video 
							autoPlay 
							loop 
							muted 
							playsInline
							style={{width: '100%', height: '100%', objectFit: 'cover'}}
						>
							<source src="/robotics/showcase.mp4" type="video/mp4" />
						</video>
					</div>
					<div className="gallery-item-caption">
						Quadruped robot locomotion demo
					</div>
				</div>
			</div> */}

			{/* Main Content */}
			<div className="content-block-highlight blog-content whitespace-pre-wrap">
				<h2>Project Description</h2>
				<p>
					I am currently serving as the Software Co-Lead for the Rice Robotics team&apos;s quadruped robot project. Our team&apos;s goal is the ongoing development of a cat-inspired robot capable of autonomously navigating to follow the guidance of a laser-pointer-inspired targeting controller. To do this, we are leveraging reinforcement learning (RL) techniques to optimize the robot&apos;s gait and locomotion strategies.
				</p>
			</div>

			{/* Background section with side images */}
			<div className="content-block flex gap-6">
				<div className="flex-[8] blog-content whitespace-pre-line">
					<h2>Background</h2>
					<p>
						This project started around two years ago as an initially mechanical design challenge to create a leg capable of powerful &apos;jumping&apos; motions. Over time, the project and team have grown significantly, evolving into a full quadruped robot platform with advanced locomotion capabilities. The inspiration for the robot&apos;s design comes from feline biology, aiming to replicate the agility and fluid movement of cats.
					</p>
					<p>
						As the Software Co-Lead since August 2025, my responsibilities include overseeing the development of the robot&apos;s control systems, implementing reinforcement learning algorithms for gait optimization, and integrating sensor feedback for real-time navigation. The project combines elements of mechanical engineering, computer science, and robotics to create a sophisticated autonomous system.
					</p>
					<p>
						This project is cool for a number of reasons: designing an agility-focused quadruped like this is a unique challenge that reinforcement learning is uniquely suited to, and brings with it a high level of complexity in both the computational and the physical engineering aspects of the problem. Additionally, the team at Rice Robotics is made up of a talented, interdisciplinary, and incredibly passionate group of both undergrad and graduate students who are all dedicated to pushing this project as far as we can.
					</p>
				</div>
				
				{/* Optional side images */}
				{/* <div className="image-gallery flex-[1.5]">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/robotics/robot1.png" alt="Robot overview" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							Robot platform
						</div>
					</div>
				</div>
				<div className="image-gallery flex-[1.5]">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/robotics/lab.png" alt="Lab setup" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							Testing environment
						</div>
					</div>
				</div> */}
			</div>

			{/* Technical Requirements / Research Goals */}
			<div className="content-block blog-content">
				<h2>Research Objectives</h2>
				
				<div className="flex justify-center my-6">
					{/* Optional side image */}
					{/* <div className="image-gallery flex-[3]">
						<div className="gallery-item">
							<div className="image-wrapper">
								<Image src="/robotics/diagram.png" alt="System diagram" fill style={{objectFit: "cover"}} />
							</div>
							<div className="gallery-item-caption">
								System architecture
							</div>
						</div>
					</div> */}
					<div className="flex-[8] ml-6 blog-content whitespace-pre-line">
						<p>
							[Describe the primary research questions and goals]
						</p>
						<p>
							<strong>Primary Goals:</strong> [Main objectives: handle laser-point following, recover from disturbances, navigate to target]
						</p>
						<p>
							<strong>Technical Approach:</strong> [Describe your methodology - RL algorithms, training approach, hardware platform]
						</p>
						<p>
							<strong>Success Metrics:</strong> [What metrics define success - gait efficiency, stability, adaptability, etc.]
						</p>
					</div>
				</div>
			</div>

			{/* System Design */}
			<div className="flex content-block-highlight blog-content">
				<div className="flex-[2] mr-6">
					<h2>Robot Platform & System Design</h2>
					<p>
						[Describe the quadruped robot hardware platform]
					</p>
					<p>
						[Explain key subsystems: actuators, sensors, compute platform, power]
					</p>
					<p>
						[Detail mechanical design considerations for the feline-inspired morphology]
					</p>
				</div>
				{/* Optional side image */}
				{/* <div className="flex-[1] ml-6 image-gallery">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/robotics/hardware.png" alt="Hardware design" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							Robot hardware overview
						</div>
					</div>
				</div> */}
			</div>

			{/* Software & RL Implementation */}
			<div className="content-block-highlight blog-content">
				<h2>Software Architecture & RL Implementation</h2>
				<p>
					[Describe the overall software architecture]
				</p>
				
				{/* Optional large image */}
				{/* <div className="image-gallery">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/robotics/software-arch.png" alt="Software architecture" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							Software system architecture
						</div>
					</div>
				</div> */}

				<div className="content-block blog-content">
					<h3>Control System</h3>
					<p>
						[Describe the low-level control systems - servo control, inverse kinematics, etc.]
					</p>
				</div>

				<div className="content-block blog-content">
					<h3>Reinforcement Learning Pipeline</h3>
					<p>
						[Describe your RL approach - algorithm choice (PPO, SAC, etc.), reward function design, training environment]
					</p>
					<p>
						[Explain simulation vs real-world training, sim-to-real transfer if applicable]
					</p>
				</div>

				<div className="content-block blog-content">
					<h3>Perception & State Estimation</h3>
					<p>
						[Describe sensor processing, state estimation, environmental perception]
					</p>
				</div>
			</div>

			{/* Training & Results */}
			<div className="content-block blog-content">
				<h2>Training Process & Results</h2>
				
				<div className="flex gap-6 my-8">
					<div className="flex-[3] blog-content">
						<h3>Training Methodology</h3>
						<p>
							[Describe how you trained the RL policy - environment setup, reward shaping, training time]
						</p>

						<h3>Performance Results</h3>
						<p>
							[Present key results - gait efficiency, stability metrics, learned behaviors]
						</p>

						<h3>Real-World Testing</h3>
						<p>
							[Describe physical robot testing, challenges encountered, successful demonstrations]
						</p>
					</div>

					{/* Optional side image */}
					{/* <div className="image-gallery flex-[2]">
						<div className="gallery-item">
							<div className="image-wrapper">
								<Image src="/robotics/testing.png" alt="Robot testing" fill style={{objectFit: "cover"}} />
							</div>
							<div className="gallery-item-caption">
								Robot testing in lab environment
							</div>
						</div>
					</div> */}
				</div>

				{/* Optional: Gallery of test results or gait visualizations */}
				{/* <div className="image-gallery">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/robotics/gait1.png" alt="Gait 1" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-title">Trot Gait</div>
						<div className="gallery-item-description">
							Learned trotting behavior
						</div>
					</div>
					
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/robotics/gait2.png" alt="Gait 2" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-title">Gallop Gait</div>
						<div className="gallery-item-description">
							High-speed galloping motion
						</div>
					</div>
					
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/robotics/gait3.png" alt="Gait 3" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-title">Adaptive Terrain</div>
						<div className="gallery-item-description">
							Navigation on uneven surfaces
						</div>
					</div>
				</div> */}
			</div>

			{/* Current Status / Ongoing Work */}
			<div className="content-block-highlight mt-8 blog-content">
				<h2>Current Status & Ongoing Work</h2>
				<p>
					[Since this is ongoing, describe the current state of the project]
				</p>
				
				{/* Optional large image */}
				{/* <div className="image-gallery my-6">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/robotics/current.png" alt="Current work" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							Current robot configuration
						</div>
					</div>
				</div> */}
				
				<div className="flex">
					<div className="flex-[4] mr-6">
						<p>
							[Reflect on progress so far and what you&apos;ve learned]
						</p>
						<h3>Achievements To Date:</h3>
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
								<Image src="/robotics/team.png" alt="Team" fill style={{objectFit: "cover"}} />
							</div>
							<div className="gallery-item-caption">
								Rice Robotics team
							</div>
						</div>
					</div> */}
				</div>

				<h3>Next Steps</h3>
				<p>
					[Discuss planned future work and goals for the remainder of the project]
				</p>
			</div>
		</div>
	</div>
</PaletteProvider>
	);
}
