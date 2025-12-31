import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import GridBackground from "@/components/GridBackground";
import ImageGalleryModal from "@/components/ImageGalleryModal";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

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
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<GridBackground />
				<Navigation />
				<ImageGalleryModal />
				<main className="pt-20">
					{children}
				</main>
			</body>
		</html>
	);
}
