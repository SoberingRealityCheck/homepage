'use client';

import Image from 'next/image';
import { Post } from '@/components/Post';
import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';
import { IkedaImage } from '@/utils/ikedaImage';

// SKETCH. Text is the talk script, word for word (src/app/blog/beamhalo/script.txt).
// Only cut: the "[slide N]" / "CH1" markers.
// Images come from the Google Slides deck (public/blog/beamhalo):
//   lhc, cms, trigger, halo-plot, windows, windows-reverse = the raw embedded images.
//   side-view, l1t-block, calo = cropped renders of slides 4, 7, 8, because the arrows
//   and boxes drawn on top of the image are the point of those slides.
// halo-plot is only 378px wide in the deck. That is the only copy.
// Hero = the CMS endcap photo from the references slide (hero.png), dithered like the other posts.
// TODO: date, real captions.

// One or more figures in a row. Widths are the flex weights, roughly the aspect ratios.
function Figs({ items }: { items: { src: string; alt: string; w: number; h: number }[] }) {
	return (
		<div className="flex flex-wrap items-center justify-center gap-6 my-8">
			{items.map((f) => (
				<Image
					key={f.src}
					src={`/blog/beamhalo/${f.src}.png`}
					alt={f.alt}
					width={f.w}
					height={f.h}
					style={{ margin: 0, flex: `${f.w / f.h} 1 0`, minWidth: 260, height: 'auto' }}
				/>
			))}
		</div>
	);
}

export default function BeamHaloPage() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.particles}>
			{/* Background image layer */}
			<div
				className="flex items-center justify-center min-h-screen fixed inset-0 z-0"
				// fade the image out on every side so it has no hard rectangle edge
				style={{
					WebkitMaskImage: 'radial-gradient(ellipse 46% 46% at 50% 50%, #000 55%, transparent 100%)',
					maskImage: 'radial-gradient(ellipse 46% 46% at 50% 50%, #000 55%, transparent 100%)',
				}}
			>
				<IkedaImage
					src="/blog/beamhalo/hero.png"
					palette={IKEDA_PALETTES.particles}
					alt="CMS endcap"
					ditherMethod="atkinson"
					className="w-[90%] h-[90vh] mx-auto object-contain opacity-40"
					showDebug={false}
					targetWidth={600}
					contrastBoost={2}
					brightnessAdjust={-80}
					invert={false}
				/>
			</div>

			{/* Content layer. The spacer leaves the image visible before the text. */}
			<div className="relative z-10">
				<div className="h-[50vh]" />
		<Post title="FPGA-driven Beam Halo Muon Tagging in the CMS Level 1 Trigger" date="October 9, 2026">
			<p>
				<i> The following is a transcript of a presentation I gave this October introducing my research topic to some peers. Thought it would be interesting to share here. </i>
			</p>
			
			<p>
				Hey everyone! I’m Clay, and today I’m talking about my research into FPGA implementations of Beam Halo tagging algorithms in the CMS Level-1 Trigger system at the Large Hadron Collider.
			</p>

			<h2>What</h2>

			<Figs items={[
				{ src: 'lhc', alt: 'The LHC ring, CMS, and the accelerator tunnel', w: 1000, h: 834 },
				{ src: 'cms', alt: 'CMS detector cutaway', w: 1600, h: 1131 },
			]} />

			<p>
				For those of you unaware, this is the large hadron collider! It’s the largest and most powerful particle accelerator in the world, with four or so different detector experiments positioned at different points along the ring where we induce collisions.
			</p>
			<p>
				Our lab works closely with CMS, the Compact Muon Solenoid, which runs proton-proton collisions to examine interesting physics that emerges at the crazy high energy collisions the LHC can enable.
			</p>

			<Figs items={[{ src: 'trigger', alt: 'CMS Phase-2 Level-1 trigger architecture', w: 1734, h: 972 }]} />

			<p>
				One of the interesting problems CMS faces is that it collects way too much data, most of which is uninteresting. The beams impact one another every 25 nanoseconds (these collisions are known as Bunch Crossings or BXs). which ends up being around 40 million bunch crossings a second. To counteract this the CMS has what’s known as a two-level Trigger system (which you can think of as a data filter). The level 1 system takes data directly from the sensors and routes it through a super low-level system comprised of FPGAs, which are essentially lower-level logic devices than a computer, more of a reconfigurable circuit board, that can do extremely simple kinds of math extremely fast. Output from the level 1 trigger is a couple hundred times smaller and is routed into something closer to what you’re probably thinking of, a giant cluster of computers and gpu racks known as the High Level Trigger that does more of the traditional computation kinds of analysis to decide what really needs to be kept.
			</p>

			<Figs items={[
				{ src: 'halo-plot', alt: 'Beam halo study, x-y hit map. Image credit: Jalane Mendo, 2025', w: 378, h: 350 },
				{ src: 'side-view', alt: 'CMS side view with halo muons running parallel to the beam', w: 1260, h: 810 },
			]} />

			<p>
				OK. so now we can get to the key thing here, which is beam halo. Some protons drift to the edges of the beam and smash into collimators or leftover gas upstream of CMS. This creates some interesting sensor noise in the detector: the muon byproducts of these collisions end up just passing directly through in a halo-shaped distribution with around a 2.5 meter radius. this is a fairly predictable kind of sensor noise, but it does fluctuate over time due to different properties of the beam.
			</p>
			<p>
				back in like 2013, CMS used to have a system for triggering of beam halo muons. They still have real-time monitoring across all the different sensors, but with all the various upgrades and restructurings the system has undergone over the last decade and a half, the process isn’t available as a per-event tag within the low-level trigger itself anymore. We’re looking to implement that.
			</p>

			<h2>How</h2>

			<p>
				This project is about prototyping, simulating, and testing a low-level trigger system to flag bunch crossings that contain a halo muon, so we can pass that flag downstream.
			</p>

			<Figs items={[{ src: 'windows', alt: 'Muon timing windows', w: 1600, h: 978 }]} />

			<p>
				One of the interesting and compelling problems we’ve been looking at first is the fact that our sensors will read these as traveling back in time. CMS was obviously designed with the intent of capturing data from particles coming inside out from the “interaction vertex” in the center where the collisions happen, and since we’re operating at such insanely fast time scales, we actually need to stagger the data collection windows on each layer of sensors to account for the finite speed of light. So the window for “data from collision 1” starts later on each subsequent layer of sensors such that stuff traveling at relativistic near-lightspeed should all land within the same window.
			</p>

			<Figs items={[{ src: 'windows-reverse', alt: 'Muon timing windows with a beam-halo muon', w: 1600, h: 978 }]} />

			<p>
				This creates problems and also interesting opportunities for beam halo, which come in from the “wrong” direction, outside-in, and exit from the normal direction, inside-out. From the sensor’s point of view, these particles are confusing to track as they enter and may even end up scattered across multiple windows of collision data that are typically processed in isolation.
			</p>
			<p>
				However, this pattern is also a super useful signal to detect them if you know what you’re looking for!
			</p>

			<Figs items={[{ src: 'l1t-block', alt: 'Level-1 trigger block diagram with the Beam Halo Tagger next to EMTF', w: 1440, h: 815 }]} />

			<p>
				Our goal is to design a system that sits roughly here, parallel to the Endcap Muon Track Finder, that layers data from a rolling window of time to identify beam halo using indicators like this. To do this, we’ll be implementing code in both Verilog and HLS that we can test on simulated data and development boards in the lab.
			</p>

			<h2>Why</h2>

			<Figs items={[{ src: 'calo', alt: 'Halo muons passing through the calorimeters', w: 1780, h: 850 }]} />

			<p>
				The hope is that tracking beam halo counts in realtime with a system like this will open the door to more precise energy estimates in the future. One of the inconvenient things about these Beam Halo muons is that they tend to pass directly through a line of calorimeter cells on their way through CMS, meaning they have a nonzero likelihood of contributing false energy readings that we need to account for. We currently do this with estimates from offfline analysis, but getting that data in real-time for each specific collision event would be a major upgrade to the system. This is a bit of a long shot, but we’re also hoping that setting up a system for tracking stray muons on interesting paths like these opens the door to finding more interesting kinds of new physics data that might be discarded and missed with the existing system.
			</p>

			<h2>Thanks</h2>

			<p>
				I’d like to thank my advisor, Dr. Darin Acosta, along with Patrick Kelling, Osvaldo Miguel Colin, and the rest of the Bonner Lab.
			</p>

			{/* TODO: references. Slide 9 has them. Not in the script, so left out for now. */}
		</Post>
			</div>
		</PaletteProvider>
	);
}
