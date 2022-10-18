/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    swcFileReading: true,
    appDir: true,
    newNextLinkBehavior: true,
  },
  swcMinify: true,
};

module.exports = nextConfig;
