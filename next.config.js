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
      };
    }
    return config;
  },
  // 添加以下行
  onDemandEntries: {
    // 期间页面应该保持活动状态而不被丢弃
    maxInactiveAge: 25 * 1000,
    // 同时保持活动状态的页面数
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig