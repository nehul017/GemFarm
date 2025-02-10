import type { NextConfig } from "next";
import withPWA from "next-pwa";
const nextConfig = {
  /* config options here */
  reactStrictMode: true, // Enable React strict mode for improved error handling
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
