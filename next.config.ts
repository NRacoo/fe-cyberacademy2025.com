// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ignore lint errors during production builds
    ignoreDuringBuilds: true,
  },
  // ...config lain jika ada
};

module.exports = nextConfig;
