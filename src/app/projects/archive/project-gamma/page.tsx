'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';

export default function ProjectGamma() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.electric}>
			<div className="section">
			<div className="content-block-highlight mb-8">
				<div className="flex justify-between items-start mb-4">
					<h1 className="text-display text-4xl">Project Gamma</h1>
					<span className="text-data text-accent">2023</span>
				</div>
				<div className="data-stripe mb-6" />
				<p className="text-xl text-gray-300 leading-relaxed">
					Machine learning pipeline for predictive analytics and pattern recognition
				</p>
			</div>

			<div className="content-block blog-content">
				<h2>Overview</h2>
				<p>
					Project Gamma is an end-to-end machine learning pipeline that automates model training, validation,
					and deployment. It supports multiple ML frameworks and provides a unified interface for data
					scientists.
				</p>

				<h2>Key Features</h2>
				<ul>
					<li>Automated hyperparameter tuning</li>
					<li>Model versioning and experiment tracking</li>
					<li>A/B testing framework</li>
					<li>Real-time inference API</li>
				</ul>

				<h2>Technology Stack</h2>
				<p>Built with Python, TensorFlow, MLflow, and deployed on Kubernetes.</p>
			</div>
		</div>
		</PaletteProvider>
	);
}
