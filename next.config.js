/** @type {import('next').NextConfig} */
const withReactSvg = require('next-react-svg');
const path = require('path');

const nextConfig = {
  reactStrictMode: false
};

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'public/icons'),
  nextConfig
});
