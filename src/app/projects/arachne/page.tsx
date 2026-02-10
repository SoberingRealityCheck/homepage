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
<PaletteProvider palette={IKEDA_PALETTES.arachne}>
	{/* Background image layer */}
	<div className="flex items-center justify-center min-h-screen fixed inset-0 z-0">
	<IkedaImage
		src="/arachne/arachne.png"
		palette={IKEDA_PALETTES.arachne}
		alt="Background"
		ditherMethod="atkinson"
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
					<h1 className="text-display text-4xl">Arachne Hexapod</h1>
					<span className="text-data text-accent">2025 - 2026</span>
				</div>
				<div className="data-stripe mb-6" />
				<p className="text-xl text-gray-300 leading-relaxed">
					ROS2-Powered Hexapod Robot Dorm Pet to torment my roommates with.
				</p>
			</div>

			{/* Project Info Grid */}
			<div className="grid-3 mb-12">
				<div className="data-box">
					<h3 className="text-data text-accent mb-2">Role</h3>
					<p>Solo Developer</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-secondary mb-2">Timeline</h3>
					<p>August 2025 - May 2026</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-highlight mb-2">Status</h3>
					<p>Ongoing. Slowly. When I find spare time! </p>
				</div>
			</div>

			{/* Main Content */}
			<div className="content-block-highlight blog-content whitespace-pre-wrap">
				<h2>Project Description</h2>
				<p>
					Over the summer, I decided to start working on a personal robotics project to build my familiarity with ROS2 and overall robotics system design. 
					
					I was inspired by the youtube channel &quot;Make Your Pet&quot; to build my own custom hexapod robot that could roam around my dorm room and interact with my roommates.
					
				</p>
			</div>

			{/* Background section with side images */}
			<div className="content-block flex gap-6">
				<div className="flex-[8] blog-content whitespace-pre-line">
					<h2>Background</h2>
					<p>
						This summer I found myself with a lot of free time on my hands and wanted to actually learn ROS2 in a hands-on way by doing a project with it!
					</p>
					<p>
						I&apos;d done a bit of work the previous year with a simpler robot (the &quot;CACTI&quot; cheetah ball robot), but wanted to do something more complex that would really challenge me to learn new skills. The onboard computer for this project is a Raspberry Pi, which was substantially more powerful than the Arduino I used for CACTI, so I was excited to leverage that extra compute power to do some computer vision and reinforcement learning.
					</p>
					<p>
						I decided on a hexapod robot because I liked the idea of a multi-legged platform that could navigate complex terrain, and also because I thought it would be fun to build a robot pet to annoy my roommates with.
					</p>
					<p>
						My goal with this project is to learn ROS2, computer vision, and reinforcement learning by building a robot that can autonomously navigate my dorm room and interact with its environment.	
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
							The main research concept of this project is: <em>Emergent Complexity. How can we design a system that has &apos;character&apos; without a strict set of preprogrammed behaviors? Inspired heavily by the way the video game Rain World handles its dynamic creature simulations. </em>
						</p>
						<p>
							<strong>Primary Goals:</strong>  Functional Hardware Platform with variety of sensors and actuators; Interesting emergent behaviors via RL-based locomotion and interaction policies.
						</p>
						<p>
							<strong>Technical Approach:</strong> ROS2-based software architecture; Simple hardware design using off-the-shelf components; Fun aesthetic design
						</p>
						<p>
							<strong>Success Metrics:</strong> While the end result of the project is somewhat less important to me than the learning process, I will consider the project a full success if I am able to achieve the following: 
						</p>
						<ul>
							<li> - functional hexapod robot that can autonomously navigate my dorm room;</li>
							<li> - learned locomotion policies that enable the robot to move in interesting ways;</li>
							<li> - successful integration of computer vision for basic environmental awareness;</li>
							<li> - a robot that has enough &quot;character&quot; to be an entertaining pet for my roommates to interact with.</li>
							<li> - pleasant web interface for monitoring and controlling the robot</li>
						</ul>
						
					</div>
				</div>
			</div>

			{/* System Design */}
			<div className="flex content-block-highlight blog-content">
				<div className="flex-[2] mr-6">
					<h2>Robot Platform & System Design</h2>
					<p>
						The robot is a custom-built hexapod with 18 degrees of freedom (3 per leg) designed to be a functional and visually interesting platform for testing my locomotion and perception software. The mechanical design and pallete are both inspired by the angular aesthetics of several of my favorite fictional robots, such as BB-8 from Star Wars and the crab-like robots from Horizon: Zero Dawn.
					</p>
					<p>
						The hardware design is intentionally simple and modular, using off-the-shelf components like the MG996R servos for actuation, a Servo2040 microcontroller for control and calibration, and a Raspberry Pi for onboard computation. The legs are designed to be easily replaceable, allowing for quick iteration on the mechanical design as I test different configurations and gaits.
					</p>
					<p>
						The software is generally designed to be modular and flexible, to make updates and experinentation easier as I learn more about ROS2 and robotics system design.
					</p>
				</div>
				<div className="flex-[1] ml-6 image-gallery">
					<div className="gallery-item">
						<div className="image-wrapper">
							<img
								src="/arachne/arachne_cute_head_design.png"
								alt="Arachne head design"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="gallery-item-caption">
							Head design concept
						</div>
					</div>
				</div>
			</div>

			{/* Software & RL Implementation */}
			<div className="content-block-highlight blog-content">
				<h2>Software Architecture & RL Implementation</h2>
				<p>
					The software architecture is built on ROS2, with a focus on modularity and flexibility. The main components of the software system include the low-level control node for servo actuation, a perception node for processing camera input and estimating the robot&apos;s state, and a reinforcement learning node that learns locomotion policies in simulation and transfers them to the real robot.
				</p>
				
				<div className="content-block blog-content">
					<h3>Reinforcement Learning Pipeline</h3>
					<p>
						My Reinforcement Learning Pipeline is basically copied directly from my work on the Rice Robotics Quadruped - our system there is generalized enough to be easily adapted to the hexapod platform. The main idea is to use the Genesis simulator to train a locomotion policy in a simplified environment, using a reward function that encourages efficient and stable movement. The trained policy is then transferred to the real robot, where I can test its performance and make adjustments as needed.
					</p>

					<div className="image-gallery my-6">
						<div className="gallery-item">
							<div className="image-wrapper">
								<img
									src="/arachne/pybullet.jpg"
									alt="PyBullet simulation environment"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="gallery-item-caption">
								PyBullet simulation environment for locomotion training
							</div>
						</div>
					</div>

					<p>
						Making the jump from simulation to reality is something I am quite curious about. I have not made it to the point of testing the sim-to-real transfer yet, but I am interested to see how well the policies trained in simulation will perform on the real robot, and what adjustments I will need to make to account for the differences between the sim and real environments. Adjusting a neural network is not as simple as adjusting a traditional control policy, so I am interested to see how I can iterate on the policy design and reward function to achieve better performance on the real robot without as much direct control over its behavior.
					</p>
				</div>

				<div className="content-block blog-content pt-0">
					
					<div className="flex items-start gap-6 pt-0">
						<div className="flex-[8] blog-content">
						<h3>Perception & State Estimation</h3>
						<p>
							For perception, I am using a simple RGB camera mounted on the front of the robot along with a 1-axis YLIDAR module for depth sensing. The perception node processes the camera input to estimate the robot&apos;s state and its environment, which is then used by the RL policy for decision making. 
						</p>
						<p>
							I am still in the early stages of developing the perception system, but I am interested to see how well I can integrate the camera and LIDAR data to create a useful representation of the robot&apos;s surroundings for navigation and interaction. 
						</p>
						<p>
							My goal is ultimately to provide it with enough data for it to make decisions autonomously on where to move and how to interact with objects in the environment, but that is obviously a massive goal and one I am currently taking very small steps towards!
						</p>
						</div>
						{/* Optional side image */}
						{/* <div className="image-gallery flex-[3]">
							<div className="gallery-item">
								<div className="image-wrapper">
									<Image src="/robotics/perception.png" alt="Perception system diagram" fill style={{objectFit: "cover"}} />
								</div>
								<div className="gallery-item-caption">
									Perception system diagram
								</div>
							</div>
						</div> */}
					<div className="image-gallery max-w-xs">
						<div className="gallery-item">
							<div className="image-wrapper">
								<video
									autoPlay
									loop
									muted
									playsInline
									style={{width: '100%', height: '100%', objectFit: 'cover',}}
								>
									<source src="/arachne/lidar_camera_rosboard_nodes.mp4" type="video/mp4" />
								</video>
							</div>
							<div className="gallery-item-caption">
								LIDAR, camera, and ROSBoard nodes running simultaneously
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>


			{/* Current Status / Ongoing Work */}
			<div className="content-block-highlight mt-8 blog-content">
				<h2>Current Status & Ongoing Work</h2>
				<p>
					The project is currently in the hardware development and sofware prototyping phase. I have a general concept for the electrical, mechanical, and software design, but have not yet completed a working prototype for any of them. 
				</p>
				<p>
					Electrical-systems wise, I have all of the major components and have successfully set up communications between the Pi, the Microcontroller, and the sensor suite but need to design a power distribution board to fix some issues I&apos;m having with the battery USB port providing insufficient power to my digital components. 
				</p>
				<p>
					Mechanically, I have a basic design for the full robot and have successfully 3D printed a few of the components, but need to adjust the sizing and figure out how how to securely mount the electronics and servos to the 3D-printed frame without damaging them. The exact length of the leg segments will also likely need iteration depending on how much torque the servos can provide. 
				</p>
				<p>
					Software-wise, I have set up the basic ROS2 architecture and have successfully implemented low-level control of the servos and basic processing of the camera, IMU, and LIDAR input, but have not yet implemented any of the reinforcement learning components or done any work on the perception system beyond basic views of the sensor feeds in a web interface. My next steps on the software side are to implement a simple RL training pipeline in simulation and start testing some basic locomotion policies on the real robot. I would also like to implement a SLAM system using the camera and LIDAR data to enable the robot to build a map of its environment and localize itself within that map, which I think would be a really fun feature to have and would also provide a lot of useful information for the RL policy to use for decision making.
				</p>
				
				<div className="grid-2 my-6">
					<div className="image-gallery">
						<div className="gallery-item">
							<div className="image-wrapper">
								<video
									autoPlay
									loop
									muted
									playsInline
									style={{width: '100%', height: '100%', objectFit: 'cover'}}
								>
									<source src="/arachne/early_camera_rosboard_setup.mp4" type="video/mp4" />
								</video>
							</div>
							<div className="gallery-item-caption">
								Early camera and ROSBoard setup
							</div>
						</div>
					</div>
					<div className="image-gallery">
						<div className="gallery-item">
							<div className="image-wrapper">
								<video
									autoPlay
									loop
									muted
									playsInline
									style={{width: '100%', height: '100%', objectFit: 'cover'}}
								>
									<source src="/arachne/fun_ascii_art_node.mp4" type="video/mp4" />
								</video>
							</div>
							<div className="gallery-item-caption">
								ASCII art camera node
							</div>
						</div>
					</div>
				</div>

				<div className="flex">
					<div className="flex-[4] mr-6">
						<p>
							This has been my first project with ROS2 and reinforcement learning, so I have been learning a lot as I go and am excited to continue iterating on the design and improving the robot&apos;s capabilities over time. My main focus right now is just getting a basic functional prototype up and running, but I have a lot of ideas for future improvements and features that I would like to implement as the project progresses.
						</p>
						<h3>Achievements To Date:</h3>
						<ul>
							<li>- Working ROS2 system with working LIDAR, Camera, IMU, and Microcontroller communication nodes </li>
							<li>- Designed a custom web interface layout, hosted using Cloudflare Workers. Set up a basic connection to the Pi&apos;s API to read data from it using a Cloudflare Tunnel. </li>
							<li>- Local ROS2 Web Interface using ROSBoard </li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</PaletteProvider>
	);
}
