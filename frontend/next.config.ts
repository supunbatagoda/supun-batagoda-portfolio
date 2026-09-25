import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : "export",
  reactStrictMode: true,
};

export default nextConfig;
