'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <PaletteProvider palette={IKEDA_PALETTES.homepage}>
            <div className="section">
            <div className="mb-12">
                <h1 className="text-display mb-4">
                    <span className="text-highlight">{'>'}</span> Art [Work in Progress]
                </h1>
                <div className="data-stripe" />
                <p className="text-xl mt-6 text-gray-300">A collection of things I&apos;ve made.</p>
            </div>
		<div className="flex md:flex-row flex-col gap-8">
            <div className="flex-1 gap-8">
                <div className="content-block">
                    <h2 className="text-heading text-2xl mb-6">Oasis</h2>
					<Link href="https://oasis.claygoldsmith.com" target="_blank" rel="noopener noreferrer">
						<Image
						src="/art/oasis.png"
						alt="Oasis"
						className=" w-full h-auto"
						width={600}
						height={400}
						/>
					</Link>
					<p>A digital art piece inspired by an attempt to replicate video game &quot;biome&quot; themes and experiment with different dithering techniques on a rather neat video I took several years back. All songs made using several layers of Matt Tytel&apos;s Vital synthesizer in Ableton. </p>
                </div>

            </div>

            <div className="flex-1 gap-8">
                <div className="content-block">
                    <h2 className="text-heading text-2xl mb-6">Music</h2>
					<p>
						I&apos;ve played piano for over a decade and have been composing and producing my own music since 2020. However - I don&apos;t currently have a dedicated platform for sharing most of it online, so for now here are a couple of links to some of my work below.
					</p>
					<div className="flex gap-4">
						<div className="data-box flex-1">
							<h3 className="text-data text-accent mb-2">YouTube</h3>
							<a
								href="https://www.youtube.com/@clays-awesome-username"
								target="_blank"
								rel="noopener noreferrer"
								className="link text-lg"
							>
								youtube.com/@clays-awesome-username
							</a>
							<p> A collection of my music and film-related content on youtube. Mostly jazz piano covers, with a few songs or films I&apos;ve made as projects for various classes.</p>
						</div>
						<div className="data-box flex-1">
							<h3 className="text-data text-accent mb-2">Bandcamp</h3>
							<a
								href="https://zephyrgoldshine.bandcamp.com/album/thalassophobia"
								target="_blank"
								rel="noopener noreferrer"
								className="link text-lg"
							>
								thalassophobia 
							</a>
							<p>
								First attempt at making a more complete song. Created over the course of a week during my senior year of high school. Pretty messy but was a fun learning experience.
							</p>
						</div>
					</div>
                </div>
			</div>
            </div>
        </div>
        </PaletteProvider>
    );
}