'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';

// Example showing how to use palettes without needing actual images
// Replace with your own content!

export default function ProjectDelta() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.arctic}>
			<div className="section">
				{/* Project Header */}
				<div className="content-block-highlight mb-8">
					<div className="flex justify-between items-start mb-4">
						<h1 className="text-display text-4xl">Project Delta</h1>
						<span className="text-data text-accent">2023</span>
					</div>
					<div className="data-stripe mb-6" />
					<p className="text-xl text-gray-300 leading-relaxed">
						Real-time monitoring dashboard with Arctic color palette
					</p>
				</div>

				{/* Notice how all colors automatically use the arctic palette! */}
				<div className="content-block blog-content">
					<h2>Dashboard Overview</h2>
					<p>
						Project Delta is a comprehensive monitoring dashboard that provides real-time insights into
						system performance, user activity, and business metrics.
					</p>

					<div className="grid-3 my-8">
						<div className="data-box-accent">
							<h3 className="text-data text-accent mb-2">Uptime</h3>
							<p className="text-3xl font-bold text-accent">99.9%</p>
						</div>
						<div className="data-box-accent">
							<h3 className="text-data text-secondary mb-2">Requests/sec</h3>
							<p className="text-3xl font-bold text-secondary">1.2K</p>
						</div>
						<div className="data-box-accent">
							<h3 className="text-data text-highlight mb-2">Response Time</h3>
							<p className="text-3xl font-bold text-highlight">45ms</p>
						</div>
					</div>

					<h2>Technical Architecture</h2>
					<p>Built with a modern stack optimized for real-time data processing:</p>

					<div className="grid-2 my-6">
						<div className="data-box">
							<h4 className="text-data text-accent mb-3">Frontend</h4>
							<ul>
								<li>TypeScript + Next.js</li>
								<li>Real-time WebSocket connection</li>
								<li>React Query for data caching</li>
								<li>Chart.js for visualizations</li>
							</ul>
						</div>
						<div className="data-box">
							<h4 className="text-data text-secondary mb-3">Backend</h4>
							<ul>
								<li>Node.js with Express</li>
								<li>PostgreSQL for persistence</li>
								<li>Redis for caching</li>
								<li>Prometheus metrics</li>
							</ul>
						</div>
					</div>

					<h2>Key Features</h2>
					<ul>
						<li>
							<strong>Real-time Updates:</strong> WebSocket-based live data streaming
						</li>
						<li>
							<strong>Custom Alerts:</strong> Configurable thresholds and notifications
						</li>
						<li>
							<strong>Historical Analysis:</strong> Query and visualize trends over time
						</li>
						<li>
							<strong>Multi-tenant:</strong> Isolated dashboards for different teams
						</li>
					</ul>

					<h2>Code Example</h2>
					<pre><code>{`// Real-time metric subscription
const useMetrics = () => {
  const [metrics, setMetrics] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket('wss://api.example.com/metrics');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(prev => [...prev.slice(-100), data]);
    };
    
    return () => ws.close();
  }, []);
  
  return metrics;
};`}</code></pre>

					<blockquote>
						The dashboard processes over 100,000 metrics per minute while maintaining sub-100ms query
						response times.
					</blockquote>

					<h2>Results & Impact</h2>
					<p>
						Since deployment, the monitoring dashboard has become the central tool for operations teams:
					</p>

					<ul>
						<li>Reduced incident detection time by 85%</li>
						<li>Prevented 23 potential outages through early warnings</li>
						<li>Decreased mean time to resolution (MTTR) by 60%</li>
						<li>Supporting 50+ teams across the organization</li>
					</ul>
				</div>

				{/* Additional section showing off the palette colors */}
				<div className="content-block-highlight mt-8">
					<h2 className="text-heading text-2xl mb-4">Color Palette: Arctic</h2>
					<p className="mb-6">
						This page uses the Arctic palette. Notice how all text-accent, text-secondary, and
						text-highlight classes automatically use these cool blue tones.
					</p>
					<div className="grid-3">
						<div className="data-box text-center p-8" style={{ backgroundColor: 'var(--palette-color-1)' }}>
							<span className="text-black font-bold">Color 1</span>
						</div>
						<div className="data-box text-center p-8" style={{ backgroundColor: 'var(--palette-color-2)' }}>
							<span className="text-black font-bold">Color 2</span>
						</div>
						<div className="data-box text-center p-8" style={{ backgroundColor: 'var(--palette-color-3)' }}>
							<span className="text-black font-bold">Color 3</span>
						</div>
					</div>
				</div>
			</div>
		</PaletteProvider>
	);
}
