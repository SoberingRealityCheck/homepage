import type { Metadata } from "next";
// Ubuntu everywhere, self-hosted from npm (@fontsource), not next/font/google. In dev, Turbopack's Google-font
// loader crashed on Google's font URLs ("queries have exactly one entry"). These are plain CSS + files, no network.
// Ubuntu has no 600 weight, so headings use 500 (Medium). 700 is for bold text, italic is 400 only.
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/400-italic.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import "./globals.css";
import Navigation from "@/components/Navigation";
import BackgroundHeroes from "@/components/BackgroundHeroes";

export const metadata: Metadata = {
	title: "Clay Goldsmith",
	description: "Clay's Awesome Website",
	viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.png" type="image/png"></link>
			</head>
			<body className="antialiased">
				<BackgroundHeroes />
				<div className="shell">
					<Navigation />
					<main>
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
