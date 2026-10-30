'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
	const pathname = usePathname();

	const links = [
		{ href: '/', label: 'Blog' },
		{ href: '/art', label: 'Art' },
		{ href: '/resume', label: 'Resume' },
		{ href: '/about', label: 'About' },
		{ href: 'https://github.com/soberingrealitycheck', label: 'GitHub' },
	];

	return (
		<nav className="sidebar">
			<Image src="/home/me.jpeg" alt="Clay Goldsmith" width={96} height={96} className="sidebar-photo" />
			<div className="sidebar-name">Clay Goldsmith</div>
			<p className="sidebar-blurb">
				Rice University, Class of 2027
				<br />
				B.S. in Computational Physics, Minor in Engineering Design.
			</p>
			<div className="sidebar-nav">
				{links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						aria-current={pathname === link.href ? 'page' : undefined}
					>
						{link.label}
					</Link>
				))}
			</div>
		</nav>
	);
}
