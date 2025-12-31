'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';

export default function ProjectBeta() {
	return (
		<PaletteProvider palette={IKEDA_PALETTES.dataBlue}>
			<div className="section">
			{/* Project Header */}
			<div className="content-block-highlight mb-8">
				<div className="flex justify-between items-start mb-4">
					<h1 className="text-display text-4xl">Project Beta</h1>
					<span className="text-data text-accent">2024</span>
				</div>
				<div className="data-stripe mb-6" />
				<p className="text-xl text-gray-300 leading-relaxed">
					Distributed system for large-scale data analysis and transformation
				</p>
			</div>

			{/* Blog Content - Easy to edit */}
			<div className="content-block blog-content">
				<h2>Project Overview</h2>
				<p>
					Project Beta is a distributed data processing system built to handle petabyte-scale datasets. It
					provides a unified platform for ETL operations, data quality checks, and advanced analytics.
				</p>

				<h2>Architecture</h2>
				<p>
					The system leverages Apache Spark for distributed computing, orchestrated through Apache Airflow for
					workflow management. Data is stored in a data lake architecture using AWS S3 with Parquet format
					for optimal query performance.
				</p>

				<h3>Core Components</h3>
				<ul>
					<li>Ingestion pipeline supporting multiple data sources</li>
					<li>Transformation engine with custom PySpark operators</li>
					<li>Data quality validation framework</li>
					<li>Metadata catalog for data discovery</li>
				</ul>

				<h2>Technical Highlights</h2>
				<p>
					The project implements several advanced patterns:
				</p>

				<pre><code>from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("DataPipeline") \
    .config("spark.sql.adaptive.enabled", "true") \
    .getOrCreate()

df = spark.read.parquet("s3://data-lake/raw/")
df_transformed = df.transform(apply_business_logic)</code></pre>

				<h2>Results</h2>
				<p>
					Successfully processes 2TB of data daily with 99.9% reliability. Reduced data processing time by
					75% compared to legacy systems.
				</p>
			</div>
		</div>
		</PaletteProvider>
	);
}
