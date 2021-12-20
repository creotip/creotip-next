/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true,
    modern: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}
