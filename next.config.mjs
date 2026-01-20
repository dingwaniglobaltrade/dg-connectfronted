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

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080", // backend port
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com", // e.g. render.com backend
      },
    ],
  },
};

export default nextConfig;
// next.config.js
