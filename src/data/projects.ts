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
		year: '2025-2026',
		palette: IKEDA_PALETTES.robotics,
		link: '/projects/rice-robotics',
		featured: true,
	},
	
	{
		id: 'owlsat',
		title: 'OwlSAT CubeSAT Mission',
		description: 'Development of a NASA-supported CubeSAT mission for studying Extreme-UV Radiation in Low Earth Orbit.',
		tags: ['Microcontrollers', 'CircuitPython', 'Embedded Systems'],
		year: '2025-2026',
		palette: IKEDA_PALETTES.owlsat,
		link: '/projects/owlsat',
		featured: false,
	},
	 
	{
		id: 'cacti',
		title: '"CACTI" Cheetah Ball Robot',
		description: 'Design and implementation of a spherical robot toy for enrichment of Houston Zoo cheetahs.',
		tags: ['C++', 'Real-World', 'Electrical Design', 'Arduino'],
		year: '2024-2025',
		palette: IKEDA_PALETTES.cacti,
		link: '/projects/cacti',
		featured: true,
	},

	{	
		id: 'arachne',
		title: 'Arachne Hexapod Robot',
		description: 'ROS2-Powered Hexapod Robot Dorm Pet to torment my roommates with.',
		tags: ['ROS2', 'C++', 'Python', 'Computer Vision', 'Web Development'],
		year: '2025',
		palette: IKEDA_PALETTES.arachne,
		link: '/projects/arachne',
		featured: false,
	},

	{
		id: 'beehive-cluster',
		title: 'Little Beehive Cluster',
		description: 'Visualization and mathematical modeling of the Little Beehive Cluster via GAIA DR3 data for my ASTR 230 Final Project. Collected and processed my own data from McDonald Observatory in Fort Davis, Texas.',
		tags: ['Astronomy', 'Data Visualization', 'Python', 'Astropy'],
		year: '2025',
		palette: IKEDA_PALETTES.astronomy,
		link: '/projects/beehive-cluster',
		featured: true,
	},
	
	// {
	//	id: 'anomaly-detection',
	//	title: 'CERN Anomalous Data Detection',
	//	description: 'Development of machine learning models for detecting anomalous events in particle collision data at CERN during my time at the Baylor High Energy Physics Lab.',
	//	tags: ['Python', 'Machine Learning', 'Tensorflow', 'Data Analysis'],
	//	year: '2024',
	//	palette: IKEDA_PALETTES.particles,
	//	link: '/projects/anomaly-detection',
	//	featured: false,
	//}


];
