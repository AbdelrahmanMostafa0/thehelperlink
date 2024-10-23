const { i18n } = require('./next-i18next.config');
const withTM = require('next-transpile-modules')(['flowbite-datepicker']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images2.imgbox.com',
      'flagsapi.com',
      'thehelperlink.ams3.cdn.digitaloceanspaces.com',
      'thehelperlink.ams3.digitaloceanspaces.com',
      'api-chat-engine-io.s3.amazonaws.com',
    ],
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/_error',
        destination: '/not-found',
        permanent: true,
      },
    ];
  },
};

module.exports = withTM(nextConfig);
