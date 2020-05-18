require('dotenv').config();

const SentryCliPlugin = require('@sentry/webpack-plugin');

module.exports = {
  compress: false,
  webpack: (config, options) => {
    const { isServer, dev } = options;

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';

      for (const plugin of config.plugins) {
        if (plugin.constructor.name === 'DefinePlugin') {
          plugin.definitions[
            'process.env.SENTRY_DSN'
          ] = `"${process.env.SENTRY_DSN}"`;
          plugin.definitions[
            'process.env.SENTRY_RELEASE'
          ] = `"${process.env.SENTRY_RELEASE}"`;

          break;
        }
      }

      if (!dev) {
        config.devtool = 'source-map';

        config.plugins.push(
          new SentryCliPlugin({
            include: '.next',
            ignoreFile: '.sentrycliignore',
            configFile: '.sentryclirc',
            release: process.env.SENTRY_RELEASE,
            urlPrefix: '~/_next',
            finalize: true,
            validate: true,
          })
        );

        if (config.optimization && config.optimization.minimizer) {
          for (const plugin of config.optimization.minimizer) {
            if (plugin.constructor.name === 'TerserPlugin') {
              plugin.options.sourceMap = true;
            }
          }
        }
      }
    }

    return config;
  },
};
