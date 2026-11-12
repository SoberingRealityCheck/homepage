import type { Metadata } from "next";
// Fonts are self-hosted from npm (@fontsource), not next/font/google. In dev, Turbopack's Google-font
// loader crashed on Google's font URLs ("queries have exactly one entry"). These are plain CSS + files, no network.
// EB Garamond for prose + headings (400 text, 600 headings, 700 bold, 400 italic). Inter for UI bits.
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/400-italic.css";
import "@fontsource/eb-garamond/600.css";
import "@fontsource/eb-garamond/700.css";
import "@fontsource-variable/inter";
import "./globals.css";
import Navigation from "@/components/Navigation";

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
