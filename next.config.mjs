const nextConfig = {
  eslint: {
    // Warning: Only use this if you are linting in CI/CD instead
    ignoreDuringBuilds: true,
  },
  images: {
    // 'domains' is deprecated in Next.js 15. Use 'remotePatterns' for better security.
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "admin.deo.arifahub.com" },
      { protocol: "https", hostname: "admin.africanmagicdeo.com" },
    ],
  },
};

// This must be initialized for 'getCloudflareContext' to work in 'next dev'
if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) =>
    m.initOpenNextCloudflareForDev(),
  );
}

export default nextConfig;
