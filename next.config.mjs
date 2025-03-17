const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["test.localhost", "localhost", "cms.destinycarehome.org"], // Add your domain(s) here
  },
};

export default nextConfig;
