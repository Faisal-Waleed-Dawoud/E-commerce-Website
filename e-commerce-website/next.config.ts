import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://img.clerk.com/**")],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb"
    }
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);