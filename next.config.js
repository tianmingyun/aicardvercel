/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: 'crypto-browserify',
      };
    }
    return config;
  },
  env: {
    XFYUN_APP_ID: process.env.XFYUN_APP_ID,
    XFYUN_API_KEY: process.env.XFYUN_API_KEY,
    XFYUN_API_SECRET: process.env.XFYUN_API_SECRET,
  },
}

module.exports = nextConfig