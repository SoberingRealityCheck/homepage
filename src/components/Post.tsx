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
			<div className="text-data mb-2">{date}</div>
			<h1 className="text-display mb-8">{title}</h1>
			<div className="blog-content post-body">{children}</div>
		</article>
	);
}
