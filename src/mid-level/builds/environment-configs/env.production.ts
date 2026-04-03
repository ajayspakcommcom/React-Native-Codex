import type { AppEnvironmentConfig } from './env.contract'

export const productionEnvironmentConfig: AppEnvironmentConfig = {
  analyticsEnvironment: 'production',
  apiBaseUrl: 'https://api.reactnativecodex.dev',
  appDisplayName: 'ReactNativeCodex',
  bundleSuffix: '',
  environment: 'production',
  iosSchemeName: 'ReactNativeCodex',
  maestroAppId: 'com.reactnativecodex',
  sentryEnvironment: 'production',
}
