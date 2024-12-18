import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// Initialize the PWA configuration
const withPWA = withPWAInit({
  dest: "public", // Destination for service worker and related files
  // register: true, // Automatically register the service worker
  // skipWaiting: true, // Skip waiting and activate the service worker immediately
  fallbacks: {
    // Failed page requests fallback to this.
    document: "/~offline",
    // This is for /_next/.../.json files.
    // data: "/fallback.json",
    // This is for images.
    image: "/fallback.webp",
    // This is for audio files.
    audio: "/fallback.mp3",
    // This is for video files.
    // video: "/fallback.mp4",
    // This is for fonts.
    // font: "/fallback-font.woff2",
  },
});

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"], // Add your allowed domains here
  },
  // Add other Next.js config options if needed
};

export default withPWA(nextConfig);

