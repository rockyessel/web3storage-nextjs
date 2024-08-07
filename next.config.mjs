/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'localhost' }],
    remotePatterns: [{ hostname: 'web3storage' }],
  },
};

export default nextConfig;
