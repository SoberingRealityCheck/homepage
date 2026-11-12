'use client';

import { PaletteProvider, IKEDA_PALETTES } from "@/utils/palette";
import { Hero } from '@/components/Hero';
import Image from "next/image";
import { Post } from '@/components/Post';

// Converted from content.md. Edit the markdown, then ask for a re-conversion.

// Reward terms, one typeset image each (public/blog/rewards). [file, width, height]
const REWARDS: [string, number, number][] = [
	['tracking_lin_vel', 350, 103],
	['tracking_ang_vel', 346, 104],
	['survival', 209, 60],
	['lin_vel_z', 115, 56],
	['roll_angle', 125, 55],
	['pitch_angle', 138, 57],
	['base_height', 222, 59],
	['action_rate', 301, 82],
	['similar_to_default_legs', 268, 85],
	['similar_to_default_hips', 274, 85],
	['energy', 585, 128],
	['stretching_pain', 598, 173],
	['hip_pain', 588, 173],
];

function Rewards() {
	return (
		<div className="flex flex-wrap items-center gap-x-8 gap-y-2 my-8">
			{REWARDS.map(([name, w, h]) => (
				<Image key={name} src={`/blog/rewards/${name}.svg`} alt={name.replace(/_/g, ' ')} width={w} height={h} style={{margin: 0}} />
			))}
		</div>
	);
}

// Landscape clip in the usual gallery tile. caption is optional.
function Clip({ src, poster, caption }: { src: string; poster?: string; caption?: string }) {
	return (
		<div className="image-gallery image-gallery-2 my-8">
			<div className="gallery-item">
				<div className="image-wrapper">
					<video
						autoPlay
						loop
						muted
						playsInline
						poster={poster}
						style={{width: '100%', height: '100%', objectFit: 'cover'}}
					>
						<source src={src} type="video/webm" />
					</video>
				</div>
				{caption && <div className="gallery-item-caption">{caption}</div>}
			</div>
		</div>
	);
}

// Portrait phone clip, capped so it doesn't run off the screen.
function PortraitClip({ src }: { src: string }) {
	return (
		<div className="flex justify-center my-8">
			<video
				autoPlay
				loop
				muted
				playsInline
				className="max-h-[70vh] w-auto max-w-full"
			>
				<source src={src} type="video/webm" />
			</video>
		</div>
	);
}

export default function RiceRobotics2Page() {
	return (
<PaletteProvider palette={IKEDA_PALETTES.robotics}>
	{/* Background image layer */}
	<Hero name="rice-robotics-2" />

	{/* Content layer */}
	<div className="relative z-10">

		<Post slug="rice-robotics-2" title="Rice Robotics R&D (Part 2), Teaching a Cat Robot to Move a Hell of a Lot Faster" bullets={false}>

			<div className="content-block blog-content">
				<h2>Intro</h2>
				<p>
					So when our team left off at the end of semester 1, we&apos;d sort of settled on some basic fundamentals of our tech stack (Genesis for physics simulation, rsl_rl for our reinforcement learning, some custom glue and reward function stuff using pytorch, an export pipeline to get our simulated .urdf connected live to our hardware team&apos;s Onshape design versions) in the context of the fairly-rudimentary &quot;Servobot&quot; prototype, and were planning to move forward to working with the full cat robot as soon as we could. Semester 2 started fairly strong with the mechanical team granting us access to our first full designs of the real robot.
				</p>
			</div>

			<div className="content-block blog-content">
				<h2>The Real Robot!</h2>
				<p>
					This is when we finally get a chance to tie into the central thesis of this whole project.
				</p>
				<p>
					Some context here: this project actually began as just a leg, developed prior to my arrival on the team by a set of mechanical engineers. The leg is a fairly complex 4-bar linkage design, and brings a whole set of interesting mechanical tradeoffs that make it well-suited for agile jumping movement but substantially more difficult to solve the inverse kinematics for. Suffice it to say - it&apos;s mechanically fantastic and super advantageous for our use case, but mathematically annoying enough we were having a hard time controlling it. That&apos;s where my neural net research comes in handy! Our plan was to simply see if we could get a computer to figure out how to drive.
				</p>
				<p>
					&quot;Catbot&quot; had a finalized rough design around december, meaning we could finally import it into the sim and get a look at what we were working with.
				</p>

				<div className="image-gallery image-gallery-2 my-8">
					<div className="gallery-item">
						<div className="image-wrapper">
							<Image src="/robotics/catbot in sim.webp" alt="Catbot in Genesis" fill style={{objectFit: "cover"}} />
						</div>
						<div className="gallery-item-caption">
							now this is a real robot...
						</div>
					</div>
				</div>

				<p>
					as you can see here, it&apos;s using that four-bar linkage system on each leg. Each leg is a 3DOF system driven by three actuators. Unlike servobot, we also had access to a fair bit more data here: these are some much fancier AKE60-8 KV80 actuators connected over CAN for bidirectional communication, meaning we could simultaneously drive them and also read position data from their built-in encoders. So catbot was still fairly blind, but was at the very least capable of knowing where its legs were in space (and a platform that was built with further sensor integration in mind from the get-go, so the software team wasn&apos;t quite stuck trying to teach a robot how to deal with &quot;flying blind&quot; anymore!).
				</p>

				<Clip src="/robotics/catbot assembled.webm" />
			</div>

			<div className="content-block blog-content">
				<h2>Challenge 1: Simulating Linkages</h2>
				<p>
					First problem we ran into with the sim was that URDF files(the way we represent the robot in the simualtion) are fundamentally structured in a way that makes it pretty damn hard to simulate these legs. URDF files are structured like a tree, and these legs are closed loops (and these loops are the most important part of the whole sim!). We first tried a bit of a hack: writing out most of the catbot as a URDF tree (leaving some pieces still disconnected), and then closing the loops ourselves within the physics sim by creating a force that specifically yanks together those disconnected parts every step to sort of approximate what it would be like if they were connected. This... sort of worked, but led to pretty inconsistent behavior, weird strain on the simulated robot, and an overall feeling that this was a stupid solution to an avoidable problem. So we just switched the file format for the robot to XML, which supported closed loops a bit easier.
				</p>

				<div className="image-gallery image-gallery-2 my-8">
					<div className="gallery-item">
						<div className="image-wrapper">
							<video
								autoPlay
								loop
								muted
								playsInline
								poster="/robotics/catbot in minecraft.webp"
								style={{width: '100%', height: '100%', objectFit: 'cover'}}
							>
								<source src="/robotics/catbot_run_final.webm" type="video/webm" />
							</video>
						</div>
						<div className="gallery-item-caption">
							sim up and running, with a perhaps-familiar coat of paint :)
						</div>
					</div>
				</div>
			</div>

			<div className="content-block blog-content">
				<h2>Challenge 2: Formalizing &quot;Cat&quot; - Reward Function Research</h2>
				<p>
					Back to the core challenge of machine learning! How do we actually incentivize / represent &apos;catlike&apos; movement mathematically?? This is really fun.
				</p>
				<p>
					We took a ton of early guidance from these three papers:
				</p>
				<ul className="list-disc">
					<li>MIT Mini Cheetah RL: <a href="https://agility.csail.mit.edu/" target="_blank" rel="noopener noreferrer">https://agility.csail.mit.edu/</a></li>
					<li>Energy Efficiency reward leading to RL Gait Emergence: <a href="https://arxiv.org/pdf/2111.01674" target="_blank" rel="noopener noreferrer">https://arxiv.org/pdf/2111.01674</a></li>
					<li>Enforcing Compliance Limits: <a href="https://arxiv.org/abs/2510.10759" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2510.10759</a></li>
				</ul>
				<p>
					Like I mentioned in the earlier part 1, the Fu, Kumar, Malik, Pathak paper was by far my favorite - their super cool realization in that paper was that giving an energy efficiency incentive to a robot allowed it to sort of figure out the phenomenon of &quot;walking&quot; / &quot;trotting&quot; / &quot;running&quot; without needing to be given explicit direction on each different pattern of movement. Obviously this is sort of how real animals figured it out too, darwinist evolution incentivized energy efficient movement which is why everything with legs has figured out how to solve this problem. But it was particularly cool to see both our Servobot and later our Catbot tests learn this from first principles!
				</p>

				<Clip src="/robotics/catbot_pack.webm" />

				<p>
					One of the other fundamental puzzles I ran into over the course of designing a training curriculum for the robot was figuring out how to adjust training weights to incentivize exploration, like I wanted the robot to be capable of trying new approaches and being rewarded for clever solutions, but still making sure it was capable of exercising caution by the time we exported it. This ended up being a sizeable chunk of our development time... by the end of a couple months of testing, we&apos;d landed on these distinct phases for the curriculum:
				</p>

				<div className="flex justify-center my-8">
					<Image src="/blog/training-phases-sim.svg" alt="Pure sim: phases 1–6" width={1000} height={163} className="w-full h-auto" style={{maxWidth: 1000}} />
				</div>

				<Rewards />
			</div>

			<div className="content-block blog-content">
				<h2>Challenge 3: SIM2Real Pitfalls</h2>
				<p>
					Our first draft of a fairly solid neural
				</p>

				<div className="flex justify-center my-8">
					<Image src="/blog/training-phases-sim2real.svg" alt="Sim to real: phases 7–14" width={1000} height={144} className="w-full h-auto" style={{maxWidth: 1000}} />
				</div>
			</div>

			<div className="content-block blog-content">
				<h2>Challenge 4: Integration &amp; Timelines</h2>
			</div>

			<div className="content-block blog-content">
				<h2>Presenting @ 2026 Huff OEDK Engineering Showcase!</h2>

				<PortraitClip src="/robotics/showcase_table.webm" />
			</div>
		</Post>
	</div>
</PaletteProvider>
	);
}
