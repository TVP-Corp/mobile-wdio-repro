const { config: sauceConfig } = require('./wdio.saucelabs.conf');

const config = {
  ...sauceConfig,
  maxInstances: 1,
  capabilities: [
    {
      platformName: 'Android',

      'appium:deviceName': 'Samsung Galaxy S10 WQHD GoogleAPI Emulator',
      'appium:platformVersion': process.env.PLATFORM_VERSION || '11.0',
      'appium:automationName': 'UiAutomator2',
      'appium:app': `storage:filename=app-release-${process.env.TUNNEL_IDENTIFIER}.apk`,
      'appium:deviceOrientation': 'portrait',
      'appium:autoGrantPermissions': true,
      'appium:fullContextList': true,
      'appium:recordScreenshots': false,
      'cjson:metadata': {
        app: {
          name: 'Baseline App',
          version: '0.0.0',
        },
        device: process.env.DEVICE || 'Samsung Galaxy S10 WQHD GoogleAPI Emulator',
        platform: {
          name: 'Android',
          version: process.env.PLATFORM_VERSION || '11.0',
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
