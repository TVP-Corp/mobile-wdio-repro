const { ReportAggregator } = require('wdio-html-nice-reporter');
const mergeResults = require('wdio-json-reporter/mergeResults');
const log4js = require('log4js');
const axios = require('axios');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

exports.config = {
  runner: 'local',

  specs: [
    '../../specs/**/*.js',
    '../../specs/**/**/*.js',
  ],

  suites: {
    common: ['../../specs/common/**/*.js'],
  },

  // Patterns to exclude.
  exclude: [],

  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'error',

  deprecationWarnings: true,
  bail: 0,

  waitforTimeout: 3000,
  connectionRetryTimeout: 120000,
  specFileRetries: 2,
  connectionRetryCount: 3,

  // Whether retried specfiles should be retried immediately or deferred to the end of the queue
  specFileRetriesDeferred: false,

  framework: 'mocha',

  mochaOpts: {
    ui: 'bdd',
    timeout: 650000,
  },

  // ========================
  // Native app compare setup
  // ========================
  services: [
    [
      'native-app-compare',
      // The options
      {
        // Mandatory
        baselineFolder: '.dist/image-compare/MobileWdioRepro',
        screenshotPath: '.dist/image-compare/screenshots',
        // Optional
        autoSaveBaseline: true,
        blockOutIphoneXBottomBar: true,
        blockOutStatusBar: true,
        blockOutNavigationBar: true,
        savePerDevice: true,
        rawMisMatchPercentage: false,
        ignoreAntiAlliasing: true,
      },
    ],
  ],

  reporters: [
    'spec',
    ['html-nice', {
      outputDir: './test/output/functional-test-report/',
      filename: 'report.html',
      reportTitle: 'Test Report Title',
      linkScreenshots: true,
      showInBrowser: false,
      collapseTests: false,
      useOnAfterCommandForScreenshot: true,
      LOG: log4js.getLogger("default")
    }
    ],
    ['json', {
      outputDir: './test/output/wdio-json/',
      outputFileFormat: (opts) => {
        return `results-${opts.cid}.json`;
      }
    }],],

  // =====
  // Hooks
  // =====

  onPrepare(_, capabilities) {
    const reportAggregator = new ReportAggregator({
      outputDir: './test/output/functional-test-report/',
      filename: 'master-report.html',
      reportTitle: 'Master Report',
      browserName: capabilities[0].browserName,
      collapseTests: false,
      useOnAfterCommandForScreenshot: true,
    });
    reportAggregator.clean();

    global.reportAggregator = reportAggregator;
  },

  before() {
    if (!browser.isAndroid) {
      browser.updateSettings({ snapshotMaxDepth: 60 });
    }
    global.assert = chai.assert;
    global.should = chai.should();
    global.chaiAsPromise = chai.use(chaiAsPromised);

  },

  onComplete: function (exitCode, config, capabilities, results) {
    mergeResults('./test/output/wdio-json/', 'results-*', 'wdio-merged.json');
    (async () => {
      await reportAggregator.createReport();
    })();
  },

  async afterTest(test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
//   //   await axios.delete('http://localhost:8631/actuator/caches');
  },
};
