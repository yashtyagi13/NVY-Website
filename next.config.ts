import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    ADMIN_ROUTE: process.env.ADMIN_ROUTE,
  },
};

module.exports = nextConfig;
