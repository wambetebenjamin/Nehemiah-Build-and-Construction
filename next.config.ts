import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  outputFileTracingIncludes: {
    "/*": ["./content/insights/*.mdx"],
  },
};

export default nextConfig;
