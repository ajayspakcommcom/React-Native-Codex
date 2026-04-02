import type { AppEnvironmentConfig } from './env.contract'

export const stagingEnvironmentConfig: AppEnvironmentConfig = {
  analyticsEnvironment: 'staging',
  apiBaseUrl: 'https://staging-api.reactnativecodex.dev',
  appDisplayName: 'ReactNativeCodex Staging',
  bundleSuffix: '.staging',
  environment: 'staging',
  iosSchemeName: 'ReactNativeCodex-Staging',
  maestroAppId: 'com.reactnativecodex.staging',
  sentryEnvironment: 'staging',
}
