/** @type {import('next').NextConfig} */
const withReactSvg = require('next-react-svg');
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/?filter=&sorter=participants&direction=desc',
      //   permanent: true
      // }
    ];
  }
};

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'public/icons'),
  webpack(config, options) {
    return config;
  },
  nextConfig
});
