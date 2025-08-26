/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/research',
        destination: '/labs',
        permanent: true,
      },
      {
        source: '/projects/anansi',
        destination: '/labs/anansi',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
