import { redirect } from 'next/navigation';

// The post list lives at / now.
export default function BlogIndex() {
	redirect('/');
}
