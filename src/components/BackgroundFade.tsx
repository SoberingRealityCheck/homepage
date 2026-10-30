'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Fades the fixed dithered backdrop on project pages as you scroll down to the content.
// Hack: finds the backdrop by its Tailwind classes instead of the pages passing it in.
const SELECTOR = '.fixed.inset-0.z-0';
const FADE_DISTANCE = 0.8; // fully faded after scrolling this fraction of the viewport height

export default function BackgroundFade() {
	const pathname = usePathname();

	useEffect(() => {
		let frame = 0;

		const update = () => {
			frame = 0;
			const opacity = Math.max(0, 1 - window.scrollY / (window.innerHeight * FADE_DISTANCE));
			document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
				el.style.opacity = String(opacity);
			});
		};

		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [pathname]);

	return null;
}
