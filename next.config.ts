import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    ADMIN_ROUTE: process.env.ADMIN_ROUTE,
  },
   eslint: {
    ignoreDuringBuilds: true, // ✅ This line disables blocking on ESLint errors
  },
};


module.exports = nextConfig;
