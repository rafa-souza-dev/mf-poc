const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { FederatedTypesPlugin } = require('@module-federation/typescript');

const createRemotePromise = (isServer) => {
  return `new Promise(resolve => {
    const urlParams = new URLSearchParams(window.location.search)
    const version = urlParams.get('next1VersionParam')
    const remoteUrlWithVersion = 'http://localhost:3001/' + version + '/remoteEntry.js'
    const script = document.createElement('script')
    script.src = remoteUrlWithVersion
    script.onload = () => {
      const proxy = {
        get: (request) => window.next1.get(request),
        init: (arg) => {
          try {
            return window.next1.init(arg)
          } catch(e) {
            console.log('remote container already initialized')
          }
        }
      }
      resolve(proxy)
    }
    document.head.appendChild(script);
  })
  `;
};

const webpack = async (config, options) => {
  const { isServer } = options;

  const federationConfig = {
    name: 'next2',
    remotes: {
      next1: createRemotePromise(isServer),
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
