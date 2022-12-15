/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['192.168.1.26', 'd30if2vv974pn3.cloudfront.net', 'kdan80-musicapp.herokuapp.com'],
  },
  env: {
    PRESIGNED_URL_ENDPOINT: process.env.PRESIGNED_URL_ENDPOINT,
    API_ALBUM_ENDPOINT: process.env.API_ALBUM_ENDPOINT,
    API_LOGIN_ENDPOINT: process.env.API_LOGIN_ENDPOINT,
    API_LOGOUT_ENDPOINT: process.env.API_LOGOUT_ENDPOINT,
  }
}

module.exports = nextConfig
