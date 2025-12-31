'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
	const pathname = usePathname();

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/projects', label: 'Projects' },
        { href: '/art', label: 'Art' },
        { href: '/community', label: 'Community' },
        { href: '/about', label: 'About' },
	];

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#1a1a1a]">
			<div className="max-w-[1400px] mx-auto px-8 py-4 flex justify-between items-center">
				<Link href="/" className="text-data text-xl font-bold tracking-wider hover:text-[var(--ikeda-red)] transition-colors">
					<span className="text-[var(--ikeda-red)]">[</span>
					PORTFOLIO
					<span className="text-[var(--ikeda-red)]">]</span>
				</Link>

				<div className="flex gap-8">
					{links.map((link) => {
						const isActive = pathname === link.href;
						return (
							<Link
								key={link.href}
								href={link.href}
								className={`text-data relative transition-colors ${
									isActive ? 'text-[var(--ikeda-red)]' : 'text-white hover:text-[var(--ikeda-cyan)]'
								}`}
							>
								{link.label}
								{isActive && (
									<span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--ikeda-red)]" />
								)}
							</Link>
						);
					})}
				</div>
			</div>

			{/* Animated accent line */}
			<div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--ikeda-red)] to-transparent opacity-50" />
		</nav>
	);
}
