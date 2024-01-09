/* eslint-disable import/extensions */
import { defaultReporter } from '@web/test-runner';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { takeScreenshotPlugin } from './wtr/screenshot-plugin.mjs';
import { pageRoutePlugin } from './wtr/page-route-plugin.mjs';

export default {
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: { args: ['--disable-web-security'], bypassCSP: true, headless: false },
    }),
    playwrightLauncher({
      product: 'firefox',
      // // Not working
      // launchOptions: {
      //   firefoxUserPrefs: { 'security.fileuri.strict_origin_policy': false },
      //   bypassCSP: true,
      // },
      // Use page route plugin to bypass CORS
    }),
    playwrightLauncher({
      product: 'webkit',
      // Use page route plugin to bypass CORS
    }),
  ],
  coverageConfig: {
    exclude: ['**/mocks/**', '**/node_modules/**', '**/test/**'],
    reportDir: 'coverage/wtr',
  },
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
  ],
  plugins: [pageRoutePlugin(), takeScreenshotPlugin()],
  testFramework: { config: { timeout: '10000' } },
};