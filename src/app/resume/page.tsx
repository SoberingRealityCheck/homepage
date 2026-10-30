// Drop the file at public/resume.pdf. It is served as /resume.pdf.
export default function ResumePage() {
	return (
		<div className="section">
			<object
				data="/resume.pdf"
				type="application/pdf"
				className="w-full h-[calc(100vh-6rem)]"
			>
				{/* shown when the browser can't embed PDFs (most phones) */}
				<a href="/resume.pdf" className="link">Resume</a>
			</object>
		</div>
	);
}
