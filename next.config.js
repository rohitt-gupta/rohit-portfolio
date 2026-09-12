const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Microlink generates the hover previews used by <LinkPreview />
      { protocol: "https", hostname: "api.microlink.io" },
    ],
  },
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
