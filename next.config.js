/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['192.168.1.26'],
  },
}

module.exports = nextConfig
