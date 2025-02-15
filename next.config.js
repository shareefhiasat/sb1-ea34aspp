/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Required for Konva
    if (!config.resolve) {
      config.resolve = {};
    }
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };
    
    return config;
  },
  // Disable image optimization to prevent worker issues
  images: {
    unoptimized: true,
  },
  // Suppress hydration warnings in development
  reactStrictMode: false,
  // Optimize for client-side rendering
  experimental: {
    workerThreads: false,
    cpus: 1,
    esmExternals: true
  },
  // Disable server components for the entire app
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;