/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "storage.googleapis.com", protocol: "https" }],
  },
};

module.exports = nextConfig;
