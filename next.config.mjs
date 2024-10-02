/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
