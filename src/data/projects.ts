import { IKEDA_PALETTES } from '@/utils/palette';

export interface Project {
	id: string;
	title: string;
	description: string;
	tags: string[];
	year: string;
	palette: typeof IKEDA_PALETTES.monochrome;
	link: string;
	featured?: boolean;
}

export const PROJECTS: Project[] = [
	{
		id: 'rice-robotics',
		title: 'Rice Robotics R&D',
		description: 'Research and development of reinforcement-learning gait optimization for a feline quadruped robot.',
		tags: ['Python', 'Machine Learning', 'Genesis'],
		year: '2025',
		palette: IKEDA_PALETTES.robotics,
		link: '/projects/rice-robotics',
		featured: true,
	},
	{
		id: 'owlsat',
		title: 'OwlSAT CubeSAT Mission',
		description: 'Development of a NASA-supported CubeSAT mission for studying Extreme-UV Radiation in Low Earth Orbit.',
		tags: ['Microcontrollers', 'CircuitPython', 'Embedded Systems'],
		year: '2024',
		palette: IKEDA_PALETTES.owlsat,
		link: '/projects/owlsat',
		featured: true,
	},
	{
		id: 'cacti',
		title: 'CACTI Cheetah Ball Robot',
		description: 'Design and implementation of a spherical robot with omni-directional movement for enrichment of Houston Zoo cheetahs.',
		tags: ['C++', 'Real-World', 'Electrical Design', 'Arduino'],
		year: '2024',
		palette: IKEDA_PALETTES.cacti,
		link: '/projects/cacti',
		featured: true,
	},
];
