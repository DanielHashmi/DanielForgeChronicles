// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com"],
//   },
//   /* other config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// Initialize the PWA configuration
const withPWA = withPWAInit({
  dest: "public", // Destination for service worker and related files
  // register: true, // Automatically register the service worker
  // skipWaiting: true, // Skip waiting and activate the service worker immediately
});

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"], // Add your allowed domains here
  },
  // Add other Next.js config options if needed
};

export default withPWA(nextConfig);

