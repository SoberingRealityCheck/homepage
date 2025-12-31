import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	// Disable Next.js Image Optimization for Cloudflare Workers
	// Use unoptimized images or Cloudflare Images binding
	images: {
		unoptimized: true,
	},
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
