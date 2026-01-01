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
							The main objective of my work so far has been to learn and implement a functional system that can effectively train the quadruped robot in a simulated environment, transfer the learned behavior to the physcial system, and run in real-time on the robot hardware. This involves several key steps:
						</p>
						<p>
							<strong>Goals:</strong> We are utilizing the cutting-edge RL training & physics simulation framework Genesis to create a high-fidelity simulation of our quadruped robot. The simulation must accurately model the robot&apos;s dynamics, sensor feedback, and interaction with the environment to ensure effective training. Our simulation must utilize techniques like command delay and domain randomization to ensure that the robot&apos;s learned behaviors transfer effectively to the real world. This includes modeling real-world noise, latency, and variability in the simulation. 
							<br />
							<br />
							We also want to develop a priveleged-unpriveleged teacher-student training setup to improve sim-to-real transfer. Our final design will not have access to the same level of sensor data that we can provide in sim, so we are working to leverage the enhanced data in sim to train a more powerful policy that can then be distilled down to run on the real robot with limited sensing.
							<br />
							<br />
							Finally, we need to implement an efficient onboard inference system that can run this trained policy in real-time on the robot&apos;s hardware within a ROS2 node. This is something we&apos;ve done only a little bit of so far, but will be a key part of testing how well our domain randomization and other sim2real techniques have worked.
						</p>
						<p>
							<strong>Success Metrics:</strong> A successful implementation should be able to: 
						</p>
						<ul> 
							<li> 1) Train a robust locomotion policy in simulation that can navigate to target locations indicated by a laser pointer </li>
							<li> 2) Transfer the learned policy to the physical robot with minimal performance degradation</li> 
							<li> 3) Run the policy in real-time on the robot hardware, enabling fall recovery and more efficient locomotion across a variety of surfaces.</li>
						</ul>
						
					</div>
				</div>
			</div>

			{/* System Design */}
			<div className="flex content-block-highlight blog-content">
				<div className="flex-[2] mr-6">
					<h2>Robot Platform & System Design</h2>
					<p>
						The quadruped is a 12-motor robot with 3 servo-driven degrees of freedom per leg (1 hip motor, 2 knee motors). The main challenge of this project has been the constraints imposed by our team&apos;s limited access to hardware: the only available perception system on our current design is a single IMU (Inertial Measurement Unit). This has made state estimation and locomotion particularly challenging... we have to rely on the servos to follow our commands accurately within some margin of error, and can only get information on the body&apos;s orientation (from the IMU&apos;s magnetometer) and acceleration(from the IMU&apos;s accelerometer). 
						
						<br />
						<br />

						This constraint has made it necessary to design a system that can essentially predict the things we cannot directly measure, such as foot contact and joint exact positions/velocities. Obviously this introduces a lot of uncertainty, but it has also made the project substantially more interesting from a computational perspective. 
					</p>
					<p>
						The robot&apos;s computational platform consists of a Raspberry Pi 5 running ROS2 Jazzy on Ubuntu. The Pi interfaces directly with the servos, and communicates with the IMU over I2C. The RL policy, bluetooth controller interface, and state estimation nodes for the joints all run in parallel as ROS2 nodes on the Pi. This approach allows for easy modular development and integration of more advanced perception systems in the future without needing a substantial redesign.
					</p>
					<p>
						While the current prototype we are testing on (named &quot;Servobot&quot;) is extremely rudimentary, our mechanical and electrical teams are hard at work desinging the full robot platform that will eventually run all of this same software. The final design will have a body shape inspired by feline anatomy, with a lightweight frame and a complex linkage system for the legs. Servobot is primarily a testbed for our software development, allowing us to iterate quickly on the control systems and RL training while the full robot design is being finalized.
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
				<h2>Software Architecture</h2>
				<p>
					Our training environment is built using the Genesis framework, which provides a powerful and fast physics simulation and RL training pipeline for robotics applications. We have built a custom robot model in Genesis that matches Servobot&apos;s (and later, Catbot&apos;s) dimensions and dynamics as closely as possible.
				</p>

				<div className="content-block blog-content">
					<h3>Control System</h3>
					<p>
						Our RL system outputs desired joint positions for each of the 12 servos at a fixed frequency. These commands are sent directly to the servos via the Raspberry Pi&apos;s GPIO interface. A low-level PID controller on each servo ensures that the commanded positions are tracked as accurately as possible given the hardware constraints (which usually requires us to recalibrate the robot before each use). The frequency of command updates will need to be adjusted to balance responsiveness with computational load on the Pi, but we&apos;re not quite there yet so that is a future problem to solve.
					</p>
				</div>

				<div className="content-block blog-content">
					<h3>Perception & State Estimation</h3>
					<p>
						In terms of perception, the current system only has the IMU to work with. We are working on modeling the motor movement speed well enough to get rough estimates of joint positions and velocities based on the commanded positions and time elapsed, but this introduces a lot of uncertainty. Terrain slowing down the joints will cause significant drift in these estimates over time. To help mitigate this, we are exploring the use of an electrical solution measuring the resistance of the servo to estimate load, which could give us some insight into foot contact events and be fed directly to the neural policy as an additional input. Still very much a work in progress - having actual motor encoders would make this way easier, but we&apos;re trying to work within the constraints of our current hardware.
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
							We are using Proximal Policy Optimization (PPO) as our RL algorithm, which has proven effective for robotics locomotion training and is integrated into Genesis extremely conveniently. 
						</p>
						<p>
							Our training utilizes a teacher-student setup: the &quot;privileged&quot; teacher model has access to full state information in simulation (exact joint positions, velocities, foot contact sensors, etc.), while the &quot;unprivileged&quot; student model only has access to the same limited sensor data that the real robot will have (IMU data, commanded joint positions). The teacher model helps guide the student&apos;s learning process, improving overall performance of the student policy given its ability to train its walking behavior from information it would otherwise not have.
						</p>
						<p>
							Our reward function is designed to encourage efficient and stable locomotion given any arbitrary [speed, direction, rotation speed] command. This includes terms for linear and angular velocity tracking, survival, and smoothness of motion. We also incorporated a reward function for energy efficiency inspired by <a href="https://arxiv.org/pdf/2111.01674" style={{color:"cyan", }}><u>this paper</u></a> and utilized many of the same domain randomization techniques described therein.
						</p>
						<p>
							To ensure effective sim-to-real transfer, we employ extensive domain randomization including:
						</p>
						<ul>
							<li> - Random payload mass and position somewhere on the body </li>
							<li> - Servo PID parameters </li>
							<li> - Friction coefficients of the ground </li>
							<li> - Sensor noise characteristics </li>
							<li> - Gravity vector direction (to simulate inclines) </li>
						</ul>
						<p>
							We also include a fixed command delay of one control step to simulate latency in the system.
						</p>

						<h3>Performance Results</h3>
						<p>
							Our training has shown promising results in simulation, with the robot learning to walk and navigate towards target locations effectively. Currently we are just working with the priveleged teacher model, which has been able to achieve stable locomotion at a variety of speeds and directions. The unprivileged student model is still in the process of being set up and connected, but we are optimistic about its potential given the success of the teacher. The energy efficiency rewards have also led to smoother and more natural transitions between types of gaits (like walking to trotting), which is encouraging for future work on more dynamic movement. 
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
					As of now, we have successfully set up the simulation environment and trained the privileged teacher model to achieve stable locomotion in Genesis. The next steps involve integrating the unprivileged student model into the training pipeline and beginning real-world testing on Servobot to evaluate sim-to-real transfer performance. This will require setting up the ROS2 inference node on the Raspberry Pi, which is my main focus for the moment. 
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
							I&apos;ve learned a tremendous amount about reinforcement learning, robotics simulation, and real-time control systems through this project so far. We started with a substantially more rudimentary system running in pybullet, and building up my fundamental understanding in that environment before transitioning to Genesis has allowed me to really deepen my understanding of exactly how these systems work. The challenges of working with limited hardware and sensor data have also pushed me to think creatively about state estimation and control strategies, which has been incredibly rewarding.
						</p>
						<h3>Achievements To Date:</h3>
						<ul>
							<li>- Successfully set up simulation environment and trained a rudimentary model using Pybullet & SK-Learn </li>
							<li>- Successfully set up simulation environment and trained a more complex model with RSL-RL & Genesis</li>
							<li>- Observed development of dynamic gait patterns, transition between walking and trotting from energy optimization reward </li>
							<li>- Remotely set up ROS2 environment on Servobot </li>
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
					My next steps are to address some lingering issues with the learned behavior in the simulation by tweaking the reward function and training parameters, integrate the unprivileged student model into the training pipeline, and set up the ROS2 nodes on Servobot to begin real-world testing. I&apos;m also looking forward to collaborating more closely with our mechanical and electrical teams as they finalize the full robot design, which will open up new possibilities for perception and control strategies. Theoretically our training process should translate nicely from Servobot to Catbot, but there will undoubtedly be new challenges to tackle once we have the full hardware platform up and running! :)
				</p>
			</div>
		</div>
	</div>
</PaletteProvider>
	);
}
