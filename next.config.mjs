const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["test.localhost", "localhost", "admin.deo.arifahub.com"], // Add your domain(s) here
  },
};

export default nextConfig;
