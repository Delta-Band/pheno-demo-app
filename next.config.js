/** @type {import('next').NextConfig} */
const withReactSvg = require('next-react-svg');
const withMDX = require('@next/mdx');
const composePlugins = require('next-compose-plugins');
const path = require('path');

const nextConfig = {
  api: {
    responseLimit: '16mb'
  },
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
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

module.exports = composePlugins(
  [
    withMDX({
      extension: /\.mdx?$/,
      options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        remarkPlugins: [],
        rehypePlugins: []
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
      }
    }),
    withReactSvg({
      include: path.resolve(__dirname, 'public/icons')
    })
  ],
  nextConfig
);
