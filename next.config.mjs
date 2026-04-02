const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "test.localhost",
      "localhost",
      "admin.deo.arifahub.com",
      "admin.africanmagicdeo.com",
    ], // Add your domain(s) here
  },
};

export default nextConfig;

import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
