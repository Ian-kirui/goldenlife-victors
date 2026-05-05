/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "golden-life-blog-9351.onrender.com",
      },
    ],
  },
}

export default nextConfig
