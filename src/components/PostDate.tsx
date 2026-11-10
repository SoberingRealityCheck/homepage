import { POSTS } from '@/data/posts';

// Date line above a post title. Reads src/data/posts.ts so the date lives in one place.
// Same look as the date in <Post>. Use it in pages that build their own header.
export function PostDate({ slug }: { slug: string }) {
	const post = POSTS.find((p) => p.slug === slug);
	if (!post) return null;
	return <div className="text-data mb-2">{post.date}</div>;
}
