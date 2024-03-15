const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { FederatedTypesPlugin } = require('@module-federation/typescript');

const webpack = (config, options) => {
  const { isServer } = options;

  const federationConfig = {
    name: 'next2',
    remotes: {
      next1: `next1@http://localhost:3000/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
    },
    filename: 'static/chunks/remoteEntry.js',
  };

  config.plugins.push(
    new NextFederationPlugin(federationConfig),
    new FederatedTypesPlugin({federationConfig: {
      ...federationConfig,
      remotes: {
        next1: `next1@http://localhost:3000/_next/static/${isServer ? 'ssr' : 'chunks'}//remoteEntry.js`,
      }
    }}),
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
