import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin"


const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts")
const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    reactCompiler: true,
  }
};

export default withNextIntl(nextConfig);
