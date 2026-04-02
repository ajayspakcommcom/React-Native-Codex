import type { AppEnvironmentConfig } from './env.contract'

export const developmentEnvironmentConfig: AppEnvironmentConfig = {
  analyticsEnvironment: 'development',
  apiBaseUrl: 'https://dev-api.reactnativecodex.dev',
  appDisplayName: 'ReactNativeCodex Dev',
  bundleSuffix: '.dev',
  environment: 'development',
  iosSchemeName: 'ReactNativeCodex-Dev',
  maestroAppId: 'com.reactnativecodex.dev',
  sentryEnvironment: 'development',
}
