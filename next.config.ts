import type { NextConfig } from "next";

// STATIC_EXPORT is set only by the GitHub Pages deploy workflow, which
// serves a static placeholder build until the app has a real backend host.
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        basePath: "/paper",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
