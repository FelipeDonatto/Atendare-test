import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/contacts",
        destination: "https://api.atendare.com/v2/contacts",
      },
    ];
  },
};

export default nextConfig;
