// /** @type {import('next').NextConfig} */
// // next.config.js
// const nextConfig = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.(png|jpe?g|gif|webp|svg)$/i,
//       type: 'asset/resource',
//     });
//     return config;
//   },
// };

// export default nextConfig; // ES Modules

// next.config.js

// next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
    ],
  },
};

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

export default withPWA(nextConfig);
