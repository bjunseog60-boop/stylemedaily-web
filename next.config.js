/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: '/stylemedaily-web',
  assetPrefix: '/stylemedaily-web/',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};
module.exports = nextConfig;
