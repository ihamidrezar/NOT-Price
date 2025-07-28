import withPWA from 'next-pwa';

// Configuration options for Next.js
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true,      // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
};

// Configuration object tells the next-pwa plugin 
const withPWAConfig = withPWA({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

// Combine the Next.js configuration with PWA configuration
const finalConfig = withPWAConfig(nextConfig);

// Export the combined configuration
export default finalConfig;
