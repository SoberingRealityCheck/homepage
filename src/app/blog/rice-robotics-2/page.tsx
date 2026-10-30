'use client';

import { PaletteProvider, IKEDA_PALETTES } from "@/utils/palette";
import { IkedaImage } from "@/utils/ikedaImage";
import Image from "next/image";

// Converted from content.md. Edit the markdown, then ask for a re-conversion.
export default function RiceRobotics2Page() {
	return (
<PaletteProvider palette={IKEDA_PALETTES.robotics}>
	{/* Background image layer */}
	<div className="flex items-center justify-center min-h-screen fixed inset-0 z-0">
	<IkedaImage
		src="/robotics/catbot.png"
		palette={IKEDA_PALETTES.robotics}
		alt="Background"
		ditherMethod="atkinson"
		className="w-[90%] h-[90vh] mx-auto object-contain opacity-40"
		showDebug={false}
		brightnessAdjust={-30}
		targetWidth={600}
		invert={false}
	/>
	</div>

	{/* Content layer */}
	<div className="relative z-10">
		<div className="h-[50vh]" />

		<div className="section">
			<div className="content-block-highlight mb-8">
				<h1 className="text-display text-4xl mb-4">Rice Robotics R&D (Part 2), Teaching a Cat Robot to Move a Hell of a Lot Faster</h1>
				<div className="data-stripe mb-6" />
			</div>

			<div className="content-block blog-content">
				<h2>Intro</h2>
				<p>
					So when our team left off at the end of semester 1, we&apos;d sort of settled on some basic fundamentals of our tech stack (Genesis for physics simulation, rsl_rl for our reinforcement learning, some custom glue and reward function stuff using pytorch, an export pipeline to get our simulated .urdf connected live to our hardware team&apos;s Onshape design versions) and were planning to move forward to working with the real robot.
				</p>
			</div>

			<div className="content-block blog-content">
				<h2>The Real Robot!</h2>
				<p>
					This is when we finally get a chance to tie into the central thesis of this whole project.
				</p>
				<p>
					Some context here: this project actually began as just a leg, developed prior to my arrival on the team by a set of mechanical engineers. The leg is a 4-bar linkage design, and brings a whole set of interesting mechanical tradeoffs that make it well-suited for agile jumping movement but substantially more difficult to solve the inverse kinematics for. Suffice it to say - it&apos;s mechanically fantastic for our use case but complex enough we were having a hard time controlling it. That&apos;s where our neural net research comes in clutch.
				</p>
				<p>
					&quot;Catbot&quot; had a finalized rough design around december, meaning we could finally import it into the sim and get a look at what we were working with.
				</p>

				<div className="image-gallery image-gallery-2 my-8">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/robotics/catbot in sim.png" alt="Catbot in Genesis" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							now this is a real robot...
						</div>
					</div>
				</div>

				<p>
					as you can see here, it&apos;s using that four-bar linkage system on each leg. Each leg is a 3DOF system driven by three actuators. Time to get to work!
				</p>
			</div>

			<div className="content-block blog-content">
				<h2>Challenge 1: Simulating Linkages</h2>
				<p>
					First problem we ran into with the sim was that URDF files(the way we represent the robot in the simualtion) are fundamentally structured in a way that makes it pretty damn hard to simulate these legs. URDF files are structured like a tree, and these legs are closed loops (and these loops are the most important part of the whole sim!). We first tried a bit of a hack: writing out most of the catbot as a URDF tree (leaving some pieces still disconnected), and then closing the loops ourselves within the physics sim by creating a force that specifically yanks together those disconnected parts every step to sort of approximate what it would be like if they were connected. This... sort of worked, but led to pretty inconsistent behavior, weird strain on the simulated robot, and an overall feeling that this was a stupid solution to an avoidable problem. So we just switched the file format for the robot to something that supported loops(XML).
				</p>

				<div className="image-gallery image-gallery-2 my-8">
					<div className="gallery-item">
						<div className="image-wrapper">
							<video
								autoPlay
								loop
								muted
								playsInline
								poster="/robotics/catbot in minecraft.png"
								style={{width: '100%', height: '100%', objectFit: 'cover'}}
							>
								<source src="/robotics/catbot_run_final.webm" type="video/webm" />
							</video>
						</div>
						<div className="gallery-item-caption">
							sim up and running, with a fresh coat of paint :)
						</div>
					</div>
				</div>
			</div>

			<div className="content-block blog-content">
				<h2>Challenge 2: Formalizing &quot;Cat&quot; - Reward Function Research</h2>
				<p>
					Back to the
				</p>
			</div>

			<div className="content-block blog-content">
				<h2>Challenge 3: Machine Learning Pitfalls</h2>
			</div>

			<div className="content-block blog-content">
				<h2>Presenting @ 2026 Huff OEDK Engineering Showcase!</h2>
			</div>
		</div>
	</div>
</PaletteProvider>
	);
}
