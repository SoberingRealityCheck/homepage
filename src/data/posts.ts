// Blog index. One entry per post, newest first.
// To add a post:
//   1. make src/app/blog/<slug>/page.tsx (wrap the body in <Post title date>)
//   2. add a line here with the same slug
// Images go in public/blog/.
export interface PostMeta {
	slug: string;
	title: string;
	date: string; // shown as is, e.g. 2025 or 2025-2026
}

export const POSTS: PostMeta[] = [
	{ slug: 'beamhalo', title: 'Designing an FPGA-driven Data Filter for the Large Hadron Collider', date: 'October 9, 2026' },
	{ slug: 'rice-robotics-2', title: 'Rice Robotics R&D (Part 2), Teaching a Cat Robot to Move a Hell of a Lot Faster', date: 'July 14, 2026'},
	{ slug: 'rice-robotics', title: 'Project: Rice Robotics R&D, Teaching a Robot to Move', date: 'November 4, 2025' },
	{ slug: 'owlsat', title: 'Project: OwlSAT, CubeSAT Mission', date: 'September 12, 2025' },
	{ slug: 'arachne', title: 'Design Project: Horrifying Hexapod Robot to Torment my Roommate', date: 'August 5, 2025' },
	{ slug: 'cacti', title: 'Project: Houston Zoo, Rolling Ball Robot for the Cheetahs', date: 'June 12, 2025' },
	{ slug: 'beehive-cluster', title: 'Project: Astronomical Study of the Little Beehive Cluster', date: 'May 20, 2025' },
];
