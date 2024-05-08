require('dotenv').config();

const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { FederatedTypesPlugin } = require('@module-federation/typescript');

const federationConfig = {
  name: 'next1',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './title': './src/components/exposedTitle.tsx',
    './button': './src/components/exposedButton.tsx',
    './useDitto': './src/hooks/useDitto.ts',
  },
  shared: {
    '@tanstack/react-query': {
      singleton: true
    }
  }
}

const webpack = (config, options) => {
  if (!options.isServer) {
    config.plugins.push(
      new NextFederationPlugin(federationConfig),
      new FederatedTypesPlugin({ federationConfig })
    );
  }

  return config;
}

const nextConfig = {
  webpack,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
