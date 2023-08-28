const { config: sauceConfig } = require('./wdio.saucelabs.conf');

const config = {
  ...sauceConfig,
  maxInstances: 1,
  appium: {
    command: 'appium',
    args: ['--relaxed-security'],
  },
  capabilities: [
    {
      platformName: 'iOS',

      'appium:deviceName': 'iPhone 13 Simulator',
      'appium:platformVersion': process.env.PLATFORM_VERSION || '15.5',
      'appium:automationName': 'XCUITest',
      'appium:app': `storage:filename=ClsMobileBaseline-${process.env.TUNNEL_IDENTIFIER}.app.zip`,
      'appium:deviceOrientation': 'portrait',
      'appium:autoGrantPermissions': true,
      'appium:fullContextList': true,
      'appium:recordScreenshots': false,
      'appium:idleTimeout': 180,
      'appium:includeSafariInWebviews': true,
      'appium:locationServicesEnabled': true,
      'appium:locationServicesAuthorized': true,
      'appium:maxTypingFrequency': 100,
      'appium:newCommandTimeout': 180,

      'cjson:metadata': {
        app: {
          name: 'Baseline App',
          version: '0.0.0',
        },
        device: process.env.DEVICE || 'iPhone 13 Simulator',
        platform: {
          name: 'iOS',
          version: process.env.PLATFORM_VERSION || '15.5',
        },
      },

      'sauce:options': {
        appiumVersion: '1.22.3',
        build: process.env.BITRISE_TRIGGERED_WORKFLOW_ID
          ? `${process.env.BITRISE_TRIGGERED_WORKFLOW_ID}-workflow-${process.env.BITRISE_BUILD_NUMBER}-build-${process.env.BITRISE_GIT_BRANCH}-branch`
          : `workflow-${process.env.APP_IDENTIFIER}-${process.env.BRANCH_NAME}-${process.env.GITHUB_SHA}`,
        extendedDebugging: false,
        unicodeKeyboard: true,
        videoUploadOnPass: false,
      },
    },
  ],
};

exports.config = config;
