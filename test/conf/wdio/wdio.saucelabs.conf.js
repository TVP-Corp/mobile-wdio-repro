const { config: sharedConfig } = require('./wdio.shared.conf');

const config = {
  ...sharedConfig,
  specFileRetries: 2,
  region: 'eu',
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  tunnelIdentifier: process.env.TUNNEL_IDENTIFIER,
  host: 'https://ondemand.eu-central-1.saucelabs.com/wd/hub',
  services: [
    ...(sharedConfig?.services || []),
    [
      'sauce',
      {
        sauceConnect: true,
        connectVersion: 'latest',
      },
    ],
  ],
};

exports.config = config;
