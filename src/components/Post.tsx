import { POSTS } from '@/data/posts';

// Shared wrapper for blog entries. Body goes in as plain JSX (h2, p, ul, pre, img...).
// blog-content in globals.css styles those tags.
// date: pass it, or pass `slug` to read it from src/data/posts.ts.
// bullets: false for the older project pages, which type their own "- " dashes.
export function Post({
	title,
	date,
	slug,
	bullets = true,
	children,
}: {
	title: string;
	date?: string;
	slug?: string;
	bullets?: boolean;
	children: React.ReactNode;
}) {
	const shownDate = date ?? POSTS.find((p) => p.slug === slug)?.date ?? '';
	return (
		<article className="section post" style={{ maxWidth: '48rem', margin: '0 auto' }}>
			<div style={{ padding: '0 0 1rem', marginBottom: '1rem' }}>
				<div className="text-data mb-2">{shownDate}</div>
				<h1 className="text-display">{title}</h1>
			</div>
			<div className={bullets ? 'blog-content post-body' : 'blog-content'}>{children}</div>
		</article>
	);
}
