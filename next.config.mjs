/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["www.printmag.com"]
  // },
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
