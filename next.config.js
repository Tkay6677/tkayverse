/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['res.cloudinary.com'],
  },
};
