/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  // output: 'export' has no server-side image optimization endpoint;
  // ship images as-is instead of failing the build the first time next/image is used.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
