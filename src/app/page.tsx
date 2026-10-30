import Link from 'next/link';
import { POSTS } from '@/data/posts';

export default function BlogPage() {
	return (
		<div className="section">
			<h1 className="text-display mb-8">Blog</h1>
			{POSTS.map((post) => (
				<Link key={post.slug} href={`/blog/${post.slug}`} className="project-card">
					<div className="text-data mb-1">{post.date}</div>
					<h2 className="project-title text-heading text-xl">{post.title}</h2>
				</Link>
			))}
		</div>
	);
}
