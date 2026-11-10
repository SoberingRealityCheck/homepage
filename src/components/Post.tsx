// Band behind the date + title so a hero image doesn't fight the text.
// Runs far past both sides of the column, so only the top and bottom fade. No visible box.
// Inline on purpose: the dev server wasn't picking up a new globals.css rule.
const TITLE_BAND = {
	position: 'absolute',
	top: 0,
	bottom: 0,
	left: '-100vw',
	right: '-100vw',
	zIndex: -1,
	pointerEvents: 'none',
	background:
		'linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--bg) 20%, transparent) 38%, color-mix(in srgb, var(--bg) 20%, transparent) 62%, transparent 100%)',
} as const;

// Shared wrapper for blog entries. Body goes in as plain JSX (h2, p, ul, pre, img...).
// blog-content in globals.css styles those tags.
export function Post({
	title,
	date,
	children,
}: {
	title: string;
	date: string;
	children: React.ReactNode;
}) {
	return (
		<article className="section max-w-3xl">
			<div style={{ position: 'relative', padding: '5rem 0 4rem', marginBottom: '1rem' }}>
				<div style={TITLE_BAND} />
				<div className="text-data mb-2">{date}</div>
				<h1 className="text-display">{title}</h1>
			</div>
			<div className="blog-content post-body">{children}</div>
		</article>
	);
}
