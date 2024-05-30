const withMDX = require('@next/mdx')()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  pageExtensions: ['mdx', 'tsx', 'ts'],
};

module.exports = withMDX(nextConfig);
