import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product icons on the "other apps" page come from BitLion's own catalog.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bitlion.us",
        pathname: "/apps/icons/**",
      },
    ],
  },
};

export default nextConfig;
