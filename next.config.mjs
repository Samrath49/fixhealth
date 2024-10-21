/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [], // Add external image domains here if any
        unoptimized: true, // Add this line to skip image optimization for local images
      },
};

export default nextConfig;
