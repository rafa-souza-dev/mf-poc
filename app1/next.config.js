/** @type {import('next').NextConfig} */

const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { FederatedTypesPlugin } = require('@module-federation/typescript');

const federationConfig = {
  name: 'next1',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './title': './src/components/exposedTitle',
    './button': './src/components/exposedButton',
    './container': './src/components/exposedContainer',
  },
}

const webpack = (config) => {
  config.plugins.push(
    new NextFederationPlugin(federationConfig),
    new FederatedTypesPlugin({ federationConfig })
  );

  return config;
}

const nextConfig = {
  webpack,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
