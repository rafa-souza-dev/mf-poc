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

  const federationConfigWorkaround = {
    ...federationConfig,
    remotes: {
      ...federationConfig.remotes,
      next1: federationConfig.remotes.next1.replace('/remoteEntry', '//remoteEntry'),
    }
  }  

  config.plugins.push(
    new NextFederationPlugin(federationConfig),
    new FederatedTypesPlugin({ federationConfig: federationConfigWorkaround }),
  );

  return config;
}

const nextConfig = {
  webpack,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
