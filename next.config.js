/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['192.168.1.26'],
  },
  env: {
    PRESIGNED_URL_ENDPOINT: process.env.PRESIGNED_URL_ENDPOINT,
    MINIO_IMAGES_BUCKET: process.env.MINIO_IMAGES_BUCKET,
    API_ALBUM_ENDPOINT: process.env.API_ALBUM_ENDPOINT
  }
}

module.exports = nextConfig
