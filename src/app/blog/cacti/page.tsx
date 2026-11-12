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
// import { Hero } from '@/components/Hero';
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
import { Hero } from '@/components/Hero';
import Image from "next/image";
import { Post } from '@/components/Post';

// A figure at its real shape (w x h). Never cropped, never sticky, caption always visible.
// Tall photos are capped at maxW so they don't fill the screen. Wide ones use the full column.
// video: show a looping clip instead of an image (w x h still sets the shape).
function Pic({ src, video, w, h, alt, caption, maxW }: {
	src?: string; video?: string; w: number; h: number;
	alt: string; caption: string; maxW?: number;
}) {
	return (
		<figure style={{ margin: '2rem auto', maxWidth: maxW ?? w }}>
			{video ? (
				<video autoPlay loop muted playsInline aria-label={alt} width={w} height={h} style={{ width: '100%', height: 'auto', margin: 0 }}>
					<source src={video} type="video/webm" />
				</video>
			) : (
				<Image src={src!} alt={alt} width={w} height={h} style={{ width: '100%', height: 'auto', margin: 0 }} />
			)}
			<figcaption className="gallery-item-caption">{caption}</figcaption>
		</figure>
	);
}

export default function ProjectTemplate() {
	return (
<PaletteProvider palette={IKEDA_PALETTES.cacti}>
	{/* Background image layer */}
	<Hero name="cacti" />

	{/* Content layer */}
	<div className="relative z-10">
		
		<Post slug="cacti" title="Project: Houston Zoo, Rolling Ball Robot for the Cheetahs">
			<h2>Project Description</h2>
			<p>
				I was on a team of 5 Rice Engineering Design students who, over the course of the 2024-2025 academic year, designed and built a remote-controlled robotic ball to provide enrichment for the cheetahs at the Houston Zoo. Our objective was to enhance the quality of life and health of the cheetahs by stimulating their natural chase behavior. My role on the team was handling all of the electrical systems and onboard software to enable the robot to run and be remotely controlled.
			</p>
			<Pic video="/cacti/showcase.webm" w={1280} h={720} alt="Cheetah ball robot in action" caption="CACTI Cheetah Ball Robot in action" />

			<h2>Background</h2>
							<p>
					Cheetahs in captivity often face challenges related to boredom and lack of stimulation, which can lead to stress and behavioral issues. To keep the cheetahs active and engaged, zookeepers provide them with daily enrichment activities that encourage mental stimulation through play.
				</p>
				<p>
					The most effective existing approach was the &quot;Cheetah Lure&quot;: a winch and pulley system that dragged toys across a field at high speeds to simulate a chase. However, new safety regulations prevented the cheetahs from leaving their habitat, restricting them to solutions that worked within their existing space.
				</p>
				<p>
					We set out to design a durable, remote-controlled enrichment ball that would stimulate their natural hunting, chasing, and surveying behaviors within the confines of their habitat.
				</p>
			
				<Pic src="/cacti/boys.webp" w={950} h={1176} alt="Dash & Dinari" caption="Dash & Dinari selfie" maxW={380} />
			<Pic src="/cacti/habitat.webp" w={948} h={1112} alt="The cheetah habitat at the Houston Zoo" caption="The cheetah habitat at the Houston Zoo" maxW={480} />

			<h2>Design Criteria</h2>
							<p>
					Through interviews with the cheetah keepers and research on cheetah behavior, we established specific design requirements:
				</p>
				<p>
					<strong>Safety:</strong> The ball shell needed to be between 6 inches and 2 feet in diameter to be safe to bat while avoiding choking risk. It should be heavy enough for stability but light enough to move safely. Material had to be hard, non-porous plastic with no rubber, breakable components, holes, or tight spaces that could trap teeth. All internal components must be completely inaccessible to the cheetahs.
				</p>
				<p>
					<strong>Mobility:</strong> The device needed remote control with at least 50-foot range, capable of reaching speeds around 5-10 mph with variable speed control. It needed to navigate grassy terrain, climb slopes, and avoid getting stuck in the exhibit&apos;s pool. The shell should be weatherproof (sun, rain, wind) and protect the internal robot from slobber, water, and rough play.
				</p>
				<p>
					<strong>Maintenance:</strong> The ball should be openable (screw panel or similar) for maintenance, repairs, and access to electronics. A rechargeable battery with easily accessible charging port was required. Runtime needed to exceed 15 minutes to cover the duration of Keeper Talks.
				</p>
				<p>
					The cheetah exhibit spans approximately 50 feet from front to back with mesh fencing, containing grass, slopes, rocks, logs, trees, and a pool (drained in winter). A flat area near the front is ideal for keeper demonstrations, while the backyard includes more sloped terrain the ball must traverse.
				</p>
			
				<Pic src="/cacti/old-toy.webp" w={554} h={618} alt="old ball toy" caption="Previous non-motorized ball toy used at the Houston Zoo" maxW={380} />

			<h2>Design Process & Brainstorming</h2>
							<p>
					With our design criteria established, we began brainstorming possible solutions. We explored several mechanical approaches for achieving movement, including hamster ball mechanisms, tracked systems, and various wheel configurations. Using brainstorming and scoring methods including a Pugh Screening Matrix, we evaluated each option against our constraints.
				</p>
				<p>
					Our winning design featured a single-handed joystick for control, a 2-axis four-wheel drive base design, tire-type grooves on the outside of the ball, and an interlocking shell mechanism. This solution scored highest due to its lightweight design (fewer motors and smaller frame), rechargeable operation, flexible four-directional movement, intuitive control, and the ability to 3D print the interlocking shell mechanism at the OEDK rather than manufacturing externally.
				</p>
				<p>
					However, during early prototyping, we encountered significant issues with mounting the two-axis four-wheel drive mechanism inside of a spherical shell. We attempted to resolve these, but ended up needing to pivot to a tank drive design instead. This was a critical decision that shaped the rest of development.
				</p>
			
				<Pic src="/cacti/initial_prototype.webp" w={650} h={718} alt="initial prototype" caption="First working prototype of the full electronics & drive system" maxW={380} />

			<h2>Final Design: &quot;Munchkin&quot;</h2>
			<p>
				Our final design is a remote-controlled robot protected by a shell.
			</p>
			<Pic src="/cacti/poster.webp" w={2304} h={1728} alt="project poster" caption="Project Poster" />
			<p>
				The system consists of three main subsystems: the drive mechanism, electrical system, and shell.
			</p>

			<h2>Drive Mechanism</h2>
			<p>
				The ball is driven by two 12V REV Hex motors arranged on opposite corners of the mechanism—one powered wheel on either side of the ball, with two unpowered wheels. This tank drive configuration allows the robot to roll forwards, backwards, and turn as normal.
			</p>
			<p>
				To prevent the internal robot from teetering or flipping inside the ball, we added two ball bearings pressed against the top of the shell on the corners without powered wheels. These act as suspension, mounted on springs to absorb impacts. The motors are secured with a custom 3D-printed ABS plastic body that has three layers—the top and middle sections sandwich the motors with bolt holes, while the bottom section holds the battery and additional weights to increase system torque.
			</p>

			<h2>Electronics & Control System</h2>
			<p>
				As electronics lead, I designed the control system around an Arduino Nano microcontroller. The signal flow works as follows: a DS-600 RC boat controller transmits PWM (pulse width modulation) signals to the receiver, which the Arduino interprets and converts to motor control signals sent to a motor driver. The motor driver then controls the flow of power to the motors in the correct direction and speed.
			</p>
			<p>
				The REV 12V battery powers the system, but since 12V would overload the Arduino and receiver, we use a step-down converter to reduce voltage to 5V for these components. A resistor on the back of the system limits inrush current to the motor driver&apos;s 1000µF capacitor, preventing destructive capacitance. This does heat up slightly during extended use, but remained cool during our 2-hour continuous test runs (well within the safe range for our expected 15-30 minute runtime).
			</p>
			<p>
				I wrote custom control code that reads PWM signals from the RC antenna (one for left/right, one for forward/backward), determines the dominant direction and speed, and handles dead-zone logic when the joystick is centered. The code then translates these inputs into the correct output signals for the motor controller. All electronics are connected via custom 3D-printed enclosures that I designed, printed, and assembled to minimize wiring distance and protect components.
			</p>

			<h2>Shell Design</h2>
			<p>
				The shell (which we named &quot;Munchkin&quot;) protects all internal components and serves as the interface for cheetah interaction. It&apos;s made from ASA plastic, a durable material designed for outdoor use that resists UV degradation. The shell has a 10-inch inner diameter with 0.25-inch wall thickness and features ridged exterior surfaces for traction and tactile interest.
			</p>
			<p>
				The shell splits into two hemispherical halves with overlapping lips that seal together. Brass insert holes along each lip can be fastened to hold it shut more securely to withstand impact forces. Assembly simply requires aligning the holes and screwing in four bolts.
			</p>
			<p>
				We manufactured each half using Prusa XL 3D printers at the Rice OEDK, with each half taking about two days to print. We tested the shell extensively—throwing it down stairs, hitting it with tools, kicking it around, and dropping it repeatedly. This was one of the most fun parts of the process. When properly screwed together, it stays intact and can withstand significant force. The shell handles slobber and water sprays but is not fully waterproof.
			</p>

			<h2>Testing & Deployment</h2>
			<p>
				We conducted extensive testing throughout development, evaluating durability, mobility, engagement, and ease of use. We set goals ahead of our tests for specific metrics we wanted our design to hit, and went back and revised the design to address all tests that did not meet these goals. Our testing process was thorough and iterative, helping us identify and fix issues before full deployment.
			</p>
							<h3 style={{ marginTop: 0 }}>Durability Testing</h3>
				<p>
					We performed drop tests by throwing the shell down stairs at two different locations: The interlocking mechanism kept the shell together with no visible cracking or damage. We also kicked the assembled ball at high impact on grass to test the shell&apos;s integrity during rough play. Both tests were successful.
				</p>
				<h3>Engagement Testing</h3>
				<p>
					Our preliminary engagement test involved moving just the robot (without the shell) near a baby jaguar behind a fence. The movement attracted the jaguar from a distance, confirming that motion-based enrichment would be engaging. We then placed just the shell (no robot) in the cheetah enclosure to attract initial interest. The cheetahs engaged with the shell, smelling and rubbing against it, which validated our material and texture choices.
				</p>
			
				<Pic src="/cacti/jaguar.png" w={360} h={640} alt="jaguar testing" caption="Baby Jaguar engagement test \n (a resounding success)" maxW={280} />
			<h3>Mobility Testing</h3>
			<p>
				We tested the integrated device on multiple terrain types. On smooth flat concrete and short grass, the ball moved successfully, matching remote controls (up → forward, down → back, etc.). However, initial testing in the enclosure with long grass and mud failed—the device just wiggled around without moving forward. We determined this was a weight issue and added more weights to the bottom of the robot, which solved the problem in subsequent tests.
			</p>
			<h3>Waterproofing Test</h3>
			<p>
				Our waterproofing test involved submerging the shell for 2 minutes and measuring water ingress via absorbent towels inside. We found high levels of water ingress, indicating that we failed in our attempts to waterproof the system. However, the zoo later confirmed that full waterproofing was not a strict requirement - the water feature in the habitat will just need to be drained during use.
			</p>
			<h3>Long-Term Reliability</h3>
			<p>
				We conducted a 2-hour continuous test run to evaluate battery life and component heating. The battery provided sufficient power throughout, and while the current-limiting resistor warmed slightly, it never reached concerning temperatures. The controller and robot both functioned reliably when properly calibrated and operated in the correct sequence (controller on first, robot off first).
			</p>

			<h2>Project Outcomes</h2>
			<p>
				As of May 2025, we handed the ball off to the Houston Zoo for testing with Dash and Dinari. The device successfully met our core design criteria: it&apos;s safe for cheetah use, mobile enough to navigate the enclosure terrain, durable enough to withstand cheetah play, and maintainable with simple tools.
			</p>
			<Pic src="/cacti/in_hab.webp" w={1356} h={802} alt="cheetah with ball" caption="Dinari investigating Munchkin" />
			<p>
				The project taught me a lot about iterative design. One of the biggest lessons was the importance of crude prototyping early on. Our initial four-wheel drive concept seemed promising, but ultimately had fundamental issues that only became apparent when actually constructing a physical system. Making a crude prototype to demonstrate would have saved us several days of time spent pursuing a dead-end design.
			</p>
			<h3>Key Achievements:</h3>
			<ul>
				<li>Designed and built complete robotic enrichment system from concept to deployment</li>
				<li>Successfully pivoted from complex drive mechanism to simpler, more reliable tank drive</li>
				<li>Implemented Arduino-based control system with 2+ hour battery life</li>
				<li>Created durable ASA plastic shell that withstood extensive impact testing</li>
				<li>Developed user-friendly maintenance process requiring only single screwdriver</li>
				<li>Passed all critical safety and mobility tests for zoo deployment</li>
			</ul>
			<h3>Future Improvements</h3>
			<p>
				While we&apos;re proud of what we accomplished, we identified several areas for future enhancement. The primary challenge is improving the robot&apos;s ability to apply torque to the shell—it sometimes moves inside the shell without pushing it effectively. Other potential improvements include better waterproofing for the interlocking mechanism, optimization of the weight distribution, and exploring autonomous movement patterns that could maintain cheetah interest when keepers aren&apos;t present. While my team&apos;s time with this project has concluded, it&apos;s possible that future students in Rice Engineering Design may continue development.
			</p>
			<Pic src="/cacti/showcase.webp" w={1294} h={1072} alt="final design" caption="Final design & Poster at the 2025 OEDK Engineering Showcase" />
		</Post>
	</div>
</PaletteProvider>
	);
}
