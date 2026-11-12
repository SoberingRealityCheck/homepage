'use client';

import Image from 'next/image';
import { Post } from '@/components/Post';
import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';
import { Hero } from '@/components/Hero';

// SKETCH. Text is the talk script, word for word (src/app/blog/beamhalo/script.txt).
// Only cut: the "[slide N]" / "CH1" markers.
// Images come from the Google Slides deck (public/blog/beamhalo):
//   lhc, cms, trigger, halo-plot, windows, windows-reverse = the raw embedded images.
//   side-view, l1t-block, calo = cropped renders of slides 4, 7, 8, because the arrows
//   and boxes drawn on top of the image are the point of those slides.
// halo-plot is only 378px wide in the deck. That is the only copy.
// Hero = the CMS endcap photo from the references slide (hero.png), dithered like the other posts.
// TODO: date, real captions.

// One or more figures in a row, with a "Figure n: ..." caption. The text points at them with <Ref n />.
// Widths are the flex weights, roughly the aspect ratios.
// ext: file type, default png.
// dark: slide screenshots on a white page. invert + hue-rotate flips light to dark and
//   keeps the hues close. "lighten" turns the pure black into the page color.
//   A hack, but it beats a white box on a dark page.
// wide: let a dense diagram break out of the text column so its labels stay readable.
type Fig = { src: string; alt: string; w: number; h: number; ext?: string; dark?: boolean; wide?: boolean;
	// circle: ring drawn over the image, in image pixels. An overlay so the dark-mode filter doesn't recolor it.
	circle?: { x: number; y: number; r: number } };

function Ref({ n }: { n: number }) {
	return <a href={`#fig-${n}`}>Figure {n}</a>;
}

function Figs({ n, caption, items }: { n: number; caption: string; items: Fig[] }) {
	const wide = items.length === 1 && items[0].wide;
	const dark = items.some((f) => f.dark);
	return (
		<figure
			id={`fig-${n}`}
			className={wide ? 'my-8 breakout' : 'my-8'}
			// own bg + isolate: mix-blend-mode only sees what is painted inside its stacking context,
			// so the page bg has to be painted here. No transform on this element, it would isolate too.
			style={{
				marginTop: '2rem', marginBottom: '2rem', // not `margin`: it would beat .breakout's margin-left
				...(dark ? { background: 'var(--bg)', isolation: 'isolate' as const } : {}),
			}}
		>
			<div className="flex flex-wrap items-center justify-center gap-6">
				{items.map((f) => (
					<div key={f.src} // maxWidth: never upscale past the real size (halo-plot is only 378px). justify-center then centers it.
						style={{ position: 'relative', flex: `${f.w / f.h} 1 0`, minWidth: 260, maxWidth: f.w }}>
						<Image
							src={`/blog/beamhalo/${f.src}.${f.ext ?? 'png'}`}
							alt={f.alt}
							width={f.w}
							height={f.h}
							unoptimized={f.ext === 'svg'}
							style={{
								margin: 0,
								width: '100%',
								height: 'auto',
								filter: f.dark ? 'invert(1) hue-rotate(180deg)' : undefined,
								mixBlendMode: f.dark ? 'lighten' : undefined,
							}}
						/>
						{f.circle && (
							<svg
								viewBox={`0 0 ${f.w} ${f.h}`}
								aria-hidden
								style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
							>
								<circle cx={f.circle.x} cy={f.circle.y} r={f.circle.r} fill="none" stroke="#ff3b3b" strokeWidth={8} />
							</svg>
						)}
					</div>
				))}
			</div>
			<figcaption style={{ margin: '0.75rem auto 0', maxWidth: 680, textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--muted)' }}>
				<b style={{ color: 'var(--ink)' }}>Figure {n}:</b> {caption}
			</figcaption>
		</figure>
	);
}

export default function BeamHaloPage() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.particles}>
			{/* Background image layer */}
			<Hero name="beamhalo" alt="CMS endcap" />

			<div className="relative z-10">
		<Post title="Designing an FPGA-driven Data Filter for the Large Hadron Collider" date="October 9, 2026">
			<p>
				<i> The following is a transcript of a presentation I gave this October introducing my research topic to some peers. Thought it would be interesting to share here. </i>
			</p>
			
			<p>
				Hey everyone! I’m Clay, and today I’m talking about my research into FPGA implementations of Beam Halo tagging algorithms in the CMS Level-1 Trigger system at the Large Hadron Collider.
			</p>

			<h2>What</h2>

			<p>
				For those of you unaware, this is the large hadron collider (<Ref n={1} />)! It’s the largest and most powerful particle accelerator in the world, with four or so different detector experiments positioned at different points along the ring where we induce collisions.
			</p>

			<Figs n={1} caption="The Large Hadron Collider ring, with the CMS experiment marked." items={[
				{ src: 'lhc', ext: 'webp', alt: 'The LHC ring, CMS, and the accelerator tunnel', w: 1000, h: 834 },
			]} />
			<p>
				Our lab works closely with CMS, the Compact Muon Solenoid (<Ref n={2} />), which runs proton-proton collisions to examine interesting physics that emerges at the crazy high energy collisions the LHC can enable.
			</p>

			<Figs n={2} caption="A cutaway of the CMS detector." items={[
				{ src: 'cms-dark', ext: 'webp', alt: 'CMS detector cutaway', w: 1600, h: 1131 },
			]} />

			<p>
				One of the interesting problems CMS faces is that it collects way too much data, most of which is uninteresting. The beams impact one another every 25 nanoseconds (these collisions are known as Bunch Crossings or BXs). which ends up being around 40 million bunch crossings a second. To counteract this the CMS has what’s known as a two-level Trigger system (which you can think of as a data filter). The level 1 system takes data directly from the sensors and routes it through a super low-level system comprised of FPGAs, which are essentially lower-level logic devices than a computer, more of a reconfigurable circuit board, that can do extremely simple kinds of math extremely fast (<Ref n={3} />). Output from the level 1 trigger is a couple hundred times smaller and is routed into something closer to what you’re probably thinking of, a giant cluster of computers and gpu racks known as the High Level Trigger that does more of the traditional computation kinds of analysis to decide what really needs to be kept.
			</p>

			<Figs n={3} caption="CMS Phase-2 Level-1 trigger architecture. Data flows down from the detector electronics at the top to the Global Trigger at the bottom." items={[{ src: 'trigger-crop', alt: 'CMS Phase-2 Level-1 trigger architecture', w: 1716, h: 796, dark: true, wide: true }]} />

			<p>
				OK. so now we can get to the key thing here, which is beam halo. Some protons drift to the edges of the beam and smash into collimators or leftover gas upstream of CMS. This creates some interesting sensor noise in the detector: the muon byproducts of these collisions end up just passing directly through in a halo-shaped distribution with around a 2.5 meter radius (<Ref n={4} />). this is a fairly predictable kind of sensor noise, but it does fluctuate over time due to different properties of the beam.
			</p>

			<Figs n={4} caption="Beam halo muons. Left: detector hits in the x-y plane form a ring (Jalane Mendo, 2025). Right: side view of CMS. Halo muons (red) run parallel to the beam. Particles from collisions (yellow) fan out from the center." items={[
				{ src: 'halo-plot', alt: 'Beam halo study, x-y hit map. Image credit: Jalane Mendo, 2025', w: 378, h: 350 },
				{ src: 'side-view', ext: 'webp', alt: 'CMS side view with halo muons running parallel to the beam', w: 1260, h: 810 },
			]} />
			<p>
				back in like 2013, CMS used to have a system for triggering of beam halo muons. They still have real-time monitoring across all the different sensors, but with all the various upgrades and restructurings the system has undergone over the last decade and a half, the process isn’t available as a per-event tag within the low-level trigger itself anymore. We’re looking to implement that.
			</p>

			<h2>How</h2>

			<p>
				This project is about prototyping, simulating, and testing a low-level trigger system to flag bunch crossings that contain a halo muon, so we can pass that flag downstream.
			</p>

			<p>
				One of the interesting and compelling problems we’ve been looking at first is the fact that our sensors will read these as traveling back in time. CMS was obviously designed with the intent of capturing data from particles coming inside out from the “interaction vertex” in the center where the collisions happen, and since we’re operating at such insanely fast time scales, we actually need to stagger the data collection windows on each layer of sensors to account for the finite speed of light. So the window for “data from collision 1” starts later on each subsequent layer of sensors such that stuff traveling at relativistic near-lightspeed should all land within the same window (<Ref n={5} />).
			</p>

			<Figs n={5} caption="Muon timing windows. A muon from bunch crossing n passes stations S1, S2 and S3 in turn. Each station's read window starts later to match, so the muon lands in the same window at every station." items={[{ src: 'windows', ext: 'svg', alt: 'Muon timing windows', w: 1190, h: 515 }]} />

			<p>
				This creates problems and also interesting opportunities for beam halo, which come in from the “wrong” direction, outside-in, and exit from the normal direction, inside-out. From the sensor’s point of view, these particles are confusing to track as they enter and may even end up scattered across multiple windows of collision data that are typically processed in isolation (<Ref n={6} />).
			</p>

			<Figs n={6} caption="The same windows with a beam-halo muon (red). It moves outside-in, so it reaches S3 first and S1 last, and S1 reads it in the next bunch crossing's window." items={[{ src: 'windows-reverse', ext: 'svg', alt: 'Muon timing windows with a beam-halo muon', w: 1190, h: 515 }]} />
			<p>
				However, this pattern is also a super useful signal to detect them if you know what you’re looking for!
			</p>

			<p>
				Our goal is to design a system that sits roughly here (<Ref n={7} />), parallel to the Endcap Muon Track Finder, that layers data from a rolling window of time to identify beam halo using indicators like this. To do this, we’ll be implementing code in both Verilog and HLS that we can test on simulated data and development boards in the lab.
			</p>

			<Figs n={7} caption="Where the Beam Halo Tagger would sit. It takes input from the endcap muon detectors, next to the Endcap Muon Track Finder, and sends its flag to the Global Muon Trigger." items={[{ src: 'l1t-block-crop', alt: 'Level-1 trigger block diagram with the Beam Halo Tagger next to EMTF', w: 1424, h: 650, dark: true, wide: true, circle: { x: 1214, y: 160, r: 58 } }]} />

			<h2>Why</h2>

			<p>
				The hope is that tracking beam halo counts in realtime with a system like this will open the door to more precise energy estimates in the future. One of the inconvenient things about these Beam Halo muons is that they tend to pass directly through a line of calorimeter cells on their way through CMS, meaning they have a nonzero likelihood of contributing false energy readings that we need to account for (<Ref n={8} />). We currently do this with estimates from offfline analysis, but getting that data in real-time for each specific collision event would be a major upgrade to the system. This is a bit of a long shot, but we’re also hoping that setting up a system for tracking stray muons on interesting paths like these opens the door to finding more interesting kinds of new physics data that might be discarded and missed with the existing system.
			</p>

			<Figs n={8} caption="Halo muons (red) running through a line of calorimeter cells can add false energy." items={[{ src: 'calo-mask', ext: 'webp', alt: 'Halo muons passing through the calorimeters', w: 1780, h: 850 }]} />

			<h2>General Timeline</h2>

			<p>
				Planning to spend this first semester getting familiarized with FPGAs. reading Nisan and Shocken&apos;s <i>The Elements of Computing Systems</i> to get a grasp of digital logic fundamentals and using this awesome HDLbits site to practice my verilog until I can get ahold of an actual development board to start testing prototypes. End goal is to have some general system architecture worked out (using the cmssw software sim clone of the trigger and a sample of the existing Verilog code as my basis) and maybe some initial modules written that I can demonstrate running on an actual board. fingers crossed!
			</p>

			{/* TODO: references. Slide 9 has them. Not in the script, so left out for now. */}
		</Post>
			</div>
		</PaletteProvider>
	);
}
