/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*' // Proxy to Backend
      },
      {
        source: '/auth/:path*',
        destination: 'http://localhost:3001/auth/:path*' // Proxy to Backend
      }
    ]
  }
}

export default nextConfig;
