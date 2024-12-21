import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// Initialize the PWA configuration
const withPWA = withPWAInit({
  ...{
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    cacheStartUrl: true,
    extendDefaultRuntimeCaching: true,
    register: true,
    stillWaiting: true,
    dest: "public",
    fallbacks: {
      //image: "/static/images/fallback.png",
      document: "/offline", // if you want to fallback to a custom page rather than /_offline
      // font: '/static/font/fallback.woff2',
      // audio: ...,
      // video: ...,
    },
    workboxOptions: {
      disableDevLogs: true,
    },
    // ... other options you like
  }
});

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"], // Add your allowed domains here
  },
  // Add other Next.js config options if needed
};

export default withPWA(nextConfig);

