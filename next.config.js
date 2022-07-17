const { truncate } = require("fs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/transactions",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
