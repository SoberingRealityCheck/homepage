'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';

export default function ProjectAlpha() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.monochrome}>
			<div className="section">
			{/* Project Header */}
			<div className="content-block-highlight mb-8">
				<div className="flex justify-between items-start mb-4">
					<h1 className="text-display text-4xl">Project Alpha</h1>
					<span className="text-data text-accent">2024</span>
				</div>
				<div className="data-stripe mb-6" />
				<p className="text-xl text-gray-300 leading-relaxed">
					Advanced data visualization platform with real-time processing capabilities
				</p>
			</div>

			{/* Project Info Grid */}
			<div className="grid-3 mb-12">
				<div className="data-box">
					<h3 className="text-data text-accent mb-2">Role</h3>
					<p>Lead Engineer</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-secondary mb-2">Timeline</h3>
					<p>6 months</p>
				</div>
				<div className="data-box">
					<h3 className="text-data text-highlight mb-2">Status</h3>
					<p>Production</p>
				</div>
			</div>

			{/* Blog Content - Easy to edit HTML */}
			<div className="content-block blog-content">
				<h2>Overview</h2>
				<p>
					Project Alpha is a comprehensive data visualization platform designed to handle real-time data streams
					and render complex visualizations with high performance. The system processes millions of data points
					per second while maintaining smooth 60fps rendering.
				</p>

				<h2>Technical Architecture</h2>
				<p>
					The platform is built on a modern tech stack leveraging TypeScript, React, and WebGL for rendering.
					The architecture follows a modular design pattern that separates concerns:
				</p>

				<ul>
					<li>Data ingestion layer with WebSocket connections</li>
					<li>Processing pipeline using Web Workers</li>
					<li>WebGL-based rendering engine</li>
					<li>State management with Redux Toolkit</li>
				</ul>

				<h3>Key Features</h3>
				<p>The system includes several innovative features:</p>

				<ul>
					<li>Real-time data streaming with automatic reconnection</li>
					<li>Custom shader-based visualizations</li>
					<li>Interactive data exploration tools</li>
					<li>Export capabilities for reports and presentations</li>
				</ul>

				<h2>Implementation Details</h2>
				<p>
					The core rendering engine utilizes WebGL 2.0 to achieve maximum performance. We implemented a custom
					scene graph system that efficiently manages thousands of visual elements:
				</p>

				<pre><code>{`const renderer = new WebGLRenderer({
  canvas: canvasRef.current,
  antialias: true,
  alpha: false
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1.0);`}</code></pre>

				<h3>Performance Optimization</h3>
				<p>
					To handle large datasets efficiently, we implemented several optimization techniques:
				</p>

				<ul>
					<li>Instance rendering for repeated geometry</li>
					<li>Level-of-detail (LOD) system for complex visualizations</li>
					<li>Frustum culling to avoid rendering off-screen objects</li>
					<li>Texture atlases to minimize draw calls</li>
				</ul>

				<h2>Results & Impact</h2>
				<p>
					The platform successfully processes and visualizes over 10 million data points in real-time with
					sub-100ms latency. User engagement increased by 300% compared to the previous solution, and the
					system now handles 50,000+ daily active users.
				</p>

				<blockquote>
					"This visualization platform transformed how our team analyzes data. What used to take hours now
					happens in seconds." - Product Manager
				</blockquote>

				<h2>Technology Stack</h2>
				<div className="grid-2">
					<div className="data-box">
						<h4 className="text-data text-accent mb-3">Frontend</h4>
						<ul>
							<li>TypeScript</li>
							<li>React 18</li>
							<li>Redux Toolkit</li>
							<li>WebGL / Three.js</li>
						</ul>
					</div>
					<div className="data-box">
						<h4 className="text-data text-secondary mb-3">Backend</h4>
						<ul>
							<li>Node.js</li>
							<li>WebSocket (Socket.io)</li>
							<li>PostgreSQL</li>
							<li>Redis</li>
						</ul>
					</div>
				</div>

				<h2>Lessons Learned</h2>
				<p>
					Throughout this project, several key insights emerged:
				</p>

				<ul>
					<li>
						<strong>Performance First:</strong> Early optimization of the rendering pipeline prevented major
						refactoring later
					</li>
					<li>
						<strong>Modular Design:</strong> Breaking down complex visualizations into reusable components
						accelerated development
					</li>
					<li>
						<strong>User Testing:</strong> Regular feedback sessions revealed UX improvements that
						significantly enhanced usability
					</li>
				</ul>

				<h2>Future Enhancements</h2>
				<p>The roadmap includes several exciting features:</p>

				<ul>
					<li>AI-powered anomaly detection in visualized data</li>
					<li>Collaborative annotation and sharing</li>
					<li>Mobile application with native rendering</li>
					<li>Integration with popular BI tools</li>
				</ul>
			</div>
		</div>
		</PaletteProvider>
	);
}
