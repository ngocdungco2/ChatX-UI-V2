/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["www.printmag.com"]
  // },
  // output: "export",
  eslint: {
    ignoreDuringBuilds: true // Disables ESLint during the build process
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true
      }
    ]
  }
}

export default nextConfig
