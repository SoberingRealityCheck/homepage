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

export default function BeehiveClusterPage() {
	return (
<PaletteProvider palette={IKEDA_PALETTES.astronomy}>
	{/* Background image layer */}
	<div className="flex items-center justify-center min-h-screen fixed inset-0 z-0">
	<IkedaImage
		src="/beehive-cluster/stars.png"
		palette={IKEDA_PALETTES.astronomy}
		alt="Background"
		ditherMethod="atkinson"
		className="w-[90%] h-[90vh] mx-auto object-contain opacity-40"
		showDebug={false}
		targetWidth={1000}
		invert={false}
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
					<h1 className="text-display text-4xl">Little Beehive Cluster</h1>
					<span className="text-data text-accent">2025</span>
				</div>
				<div className="data-stripe mb-6" />
				<p className="text-xl text-gray-300 leading-relaxed">
					Photometric and parallax analysis of the open cluster M41, using data captured from McDonald Observatory and cross-referenced with SIMBAD/GAIA satellite data.
				</p>
			</div>

			{/* Project Info Grid */}
			<div className="grid-3 mb-12">
				<div className="data-box">
					<h3 className="text-data text-accent mb-2">Role</h3>
					<p>Solo Researcher</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-secondary mb-2">Course</h3>
					<p>ASTR 230 &mdash; Rice University</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-highlight mb-2">Status</h3>
					<p>Complete</p>
				</div>
			</div>

			{/* Showcase GIF */}
			<div className="image-gallery my-8">
				<div className="gallery-item">
					<Image src="/beehive-cluster/starpositions.gif" alt="3D star positions animation" width={600} height={600} style={{width: '100%', height: 'auto'}} unoptimized />
					<div className="gallery-item-caption">
						Animated view of detected star positions across bands and exposure times.
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="content-block-highlight blog-content whitespace-pre-wrap">
				<h2>Project Description</h2>
				<p>
					For my ASTR 230 final project, I studied the young open cluster M41 &mdash; also known as the &quot;Little Beehive Cluster&quot; &mdash; to test the hypothesis that it would be denser, heavier, and hotter near the center. Using photometric data I captured via McDonald Observatory&apos;s 0.8m Prime Focus Corrector (PFC) Telescope and parallax data from SIMBAD, I performed aperture photometry, generated color-magnitude diagrams, and analyzed the radial distribution of cluster members to characterize the cluster&apos;s structure and stellar population.
				</p>
			</div>

			{/* Observation */}
			<div className="content-block flex gap-6">
				<div className="flex-[8] blog-content whitespace-pre-line">
					<h2>Observation</h2>
					<p>
						Data was captured during two separate remote observing sessions (3/29/2025 and 3/31/2025) with McDonald Observatory&apos;s 0.8m Prime Focus Corrector (PFC) Telescope. We captured images across multiple bands and exposure times to ensure both dim background stars and bright foreground stars would get accurate photometric readings:
					</p>
					<ul>
						<li>B Band &mdash; 20s and 60s exposures</li>
						<li>V Band &mdash; 3s, 7s, and 20s exposures</li>
						<li>R Band &mdash; 4s and 10s exposures</li>
					</ul>
					<p>
						We encountered significant cloud cover on the first night (3/29), so almost all of that data was discarded. Three reasonably solid V Band images from early in the night were kept to ensure a minimum of 3 images existed for each setting. The rest of the usable data came from the clearer second night (3/31).
					</p>
				</div>
			</div>

			{/* Data Processing */}
			<div className="content-block-highlight blog-content">
				<h2>Data Processing</h2>

				<div className="content-block blog-content">
					<h3>Reduction</h3>
					<p>
						Calibration files were provided by McDonald. Dark frames were not needed given the PFC&apos;s cryogenic cooling, but the median bias was subtracted and normalized flats were divided out to produce higher quality images.
					</p>
				</div>

				<div className="content-block blog-content">
					<h3>Aligning & Combining</h3>
					<p>
						All images from the same band + exposure time setting were combined to form 7 distinct images (one for each configuration). Alignment was done via brightest-pixel-matching, which worked well due to the high luminosity of a particular star in the upper-right corner of every image and the lack of any bright cosmic rays in the data. This was an imperfect solution but worked well enough for photometric analysis.
					</p>
				</div>

				<div className="content-block blog-content">
					<h3>Stellar Detection & Aperture Photometry</h3>
					<p>
						Star positions were identified using DAOStarFinder (from Python&apos;s photutils package) with the threshold set above 100 counts and an expected FWHM of 4 pixels. This returned approximately 1000&ndash;2000 possible star locations per image depending on exposure time and band.
					</p>
					{/* Image: original vs detected stars (wide aspect ratio) */}
					<div className="image-gallery my-6">
						<div className="gallery-item">
							<Image src="/beehive-cluster/originalvsdetectedstars.png" alt="Original vs detected stars" width={1200} height={400} style={{width: '100%', height: 'auto'}} />
							<div className="gallery-item-caption">
								Original image vs detected star positions overlaid.
							</div>
						</div>
					</div>
					<p>
						After finding pixel coordinates, aperture photometry was run on each star using photutils to create a circular aperture and annulus on each position and compute the approximate counts. Counts were then converted to apparent magnitude, calibrated using the standard candles HD 48924 (9.36V, 9.28B) and CPD-20 1613 (10.08R). To account for differences in apparent magnitude between exposure times, the median apparent magnitude across each band was used.
					</p>
				</div>

				<div className="content-block blog-content">
					<h3>WCS Generation & Star Identification</h3>
					<p>
						As the data did not come with WCS (World Coordinate System) information, I generated a WCS for each image manually based on the positions of 20 known stars visible in every image (positions found via SIMBAD). This allowed me to convert pixel positions to RA/DEC coordinates.
					</p>
					<p>
						After obtaining RA/DEC coordinates for each star, I cross-referenced them with a SIMBAD query of a 40&apos; radius around the image to identify matching coordinate pairs (difference &lt; 0.003 degrees) with known parallax data. This identified <strong>445 known stars</strong> in the images with distances for each. By fitting a Gaussian distribution to the distance data, the cluster location became apparent. Stars were classified by their sigma value: likely cluster members (&sigma; &lt; 1) versus unlikely members (&sigma; &gt; 3).
					</p>
					{/* Images: RA/DEC positions and distance histogram */}
					<div className="grid-2 my-6">
						<div className="image-gallery">
							<div className="gallery-item">
								<Image src="/beehive-cluster/starlocationsinRADEC.png" alt="RA/DEC locations of detected stars" width={600} height={600} style={{width: '100%', height: 'auto'}} />
								<div className="gallery-item-caption">
									RA/DEC locations of stars in the B 60s combined image.
								</div>
							</div>
						</div>
						<div className="image-gallery">
							<div className="gallery-item">
								<Image src="/beehive-cluster/distancegaussianfit.png" alt="Distance histogram with Gaussian fit" width={600} height={600} style={{width: '100%', height: 'auto'}} />
								<div className="gallery-item-caption">
									Distance distribution with Gaussian fit. The cluster peak is clearly visible.
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="content-block blog-content">
					<h3>Absolute Magnitude & Color</h3>
					<p>
						With known distances and observed apparent magnitudes for the 445 identified stars, absolute magnitudes could be estimated via straightforward distance-magnitude conversion. Color analysis was performed using B-V and V-R color index values. The B-V index was used as the primary color metric as the results were qualitatively near-identical when examined under V-R.
					</p>
					{/* Images: apparent and absolute V band magnitudes */}
					<div className="grid-2 my-6">
						<div className="image-gallery">
							<div className="gallery-item">
								<Image src="/beehive-cluster/apparentvbandmagnitudes.png" alt="Apparent V band magnitudes" width={600} height={600} style={{width: '100%', height: 'auto'}} />
								<div className="gallery-item-caption">
									Apparent V band magnitudes of detected stars.
								</div>
							</div>
						</div>
						<div className="image-gallery">
							<div className="gallery-item">
								<Image src="/beehive-cluster/absvbandmagnitudes.png" alt="Absolute V band magnitudes" width={600} height={600} style={{width: '100%', height: 'auto'}} />
								<div className="gallery-item-caption">
									Absolute V band magnitudes after distance correction.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Analysis */}
			<div className="content-block blog-content">
				<h2>Analysis</h2>
				<p>
					The center of mass of the cluster was approximated by taking the median of all &sigma; &lt; 1 star positions. This allowed calculation of the radial distance of each star as the magnitude of the distance vector to that center, enabling examination of relationships between radial distance and other stellar characteristics.
				</p>

				<div className="my-8 blog-content">
					<h3>Color-Magnitude Diagram</h3>
					<p>
						The CMD revealed a significant difference between cluster and non-cluster stars. Non-cluster stars (high &sigma;) had long since diverged from the main sequence, while cluster members (low &sigma;) were younger and displayed a much clearer structure. The cohesive structure of the cluster members implies they are all around a similar age, having formed around the same time and diverged a similar amount from the main sequence.
					</p>
					{/* Images: CMD and Color-Color diagrams */}
					<div className="grid-2 my-6">
						<div className="image-gallery">
							<div className="gallery-item">
								<Image src="/beehive-cluster/CMD.png" alt="Color-Magnitude Diagram" width={600} height={600} style={{width: '100%', height: 'auto'}} />
								<div className="gallery-item-caption">
									Color-Magnitude Diagram. Colormap corresponds to star &sigma; value.
								</div>
							</div>
						</div>
						<div className="image-gallery">
							<div className="gallery-item">
								<Image src="/beehive-cluster/colorindex.png" alt="Color-Color Diagram" width={600} height={600} style={{width: '100%', height: 'auto'}} />
								<div className="gallery-item-caption">
									Color-Color Diagram (B-V vs V-R).
								</div>
							</div>
						</div>
					</div>

					<h3>Density vs. Radial Distance</h3>
					<p>
						There was a clear linear relationship between stellar density and radial distance from the cluster center. Given the higher density near the center and the relatively young age of the cluster, this implies more star formation occurred near the center of the cluster.
					</p>
					{/* Image: Radial distance histogram */}
					<div className="image-gallery my-6">
						<div className="gallery-item">
							<Image src="/beehive-cluster/densityvsradialdistance.png" alt="Radial distance distribution" width={800} height={600} style={{width: '100%', height: 'auto'}} />
							<div className="gallery-item-caption">
								Distribution of radial distance from cluster center for &sigma; &lt; 1 stars.
							</div>
						</div>
					</div>

					<h3>Color vs. Radial Distance</h3>
					<p>
						Surprisingly, no significant correlation was found between B-V color and radial distance for cluster members. We had expected more blue (hotter, more massive) stars near the center. The pseudo-random distribution of stellar colors may imply that star formation began at several different locations within the cluster rather than solely at the center.
					</p>
					{/* Image: Radial distance vs color scatter */}
					<div className="image-gallery my-6">
						<div className="gallery-item">
							<Image src="/beehive-cluster/radialdistancevscolorindex.png" alt="Radial distance vs color" width={800} height={600} style={{width: '100%', height: 'auto'}} />
							<div className="gallery-item-caption">
								Radial distance vs B-V color. Colormap corresponds to approximate visual star color.
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Conclusion */}
			<div className="content-block-highlight mt-8 blog-content">
				<h2>Conclusions</h2>
				<p>
					The cluster member stars are visibly younger than surrounding non-cluster stars, are all around the same age, and are indeed generally denser near the center of the cluster than towards the outskirts &mdash; partially confirming the original hypothesis.
				</p>

				<div className="flex">
					<div className="flex-[4] mr-6">
						<p>
							The color analysis provided a surprising result: the lack of a radial color gradient suggests that star formation may have begun in multiple locations within the cluster rather than solely at the dense center.
						</p>
						<h3>Key Findings:</h3>
						<ul>
							<li>- Identified 445 known stars with distance data via SIMBAD cross-referencing</li>
							<li>- Cluster members display a cohesive main-sequence structure, implying similar age</li>
							<li>- Clear density gradient: stellar density increases toward the cluster center</li>
							<li>- No significant radial color gradient, suggesting multi-site star formation</li>
						</ul>
					</div>
				</div>

				<h3>Future Work</h3>
				<p>
					A more thorough examination of star density using a 3D heatmap could help test the multi-site formation hypothesis. It would also be interesting to explore alternative methods &mdash; such as CMD diagram placement or machine learning algorithms &mdash; to determine cluster membership for the remaining stars in the images whose distances could not be confirmed via parallax data.
				</p>
				{/* Image/GIF: 3D scatterplot of the cluster */}
				<div className="image-gallery my-6">
					<div className="gallery-item">
						<Image src="/beehive-cluster/colorindex3d.gif" alt="3D scatterplot of the cluster" width={600} height={600} style={{width: '100%', height: 'auto'}} unoptimized />
						<div className="gallery-item-caption">
							Interactive 3D scatterplot of cluster members, showing spatial distribution and stellar properties.
						</div>
					</div>
				</div>
			</div>

			{/* References */}
			<div className="content-block blog-content">
				<h2>Acknowledgments</h2>
				<p>
					Thanks to Dr. Megan Reiter, Anthony Atkinson, and Richard Xiao for guidance and instruction. Thanks to Roman Rothstein, Noah Oh, and Mikael Graham for debugging help. Tools used include ds9, Stellarium, Airmass.org, Skyview.org, and Astropy.
				</p>
			</div>
		</div>
	</div>
</PaletteProvider>
	);
}
