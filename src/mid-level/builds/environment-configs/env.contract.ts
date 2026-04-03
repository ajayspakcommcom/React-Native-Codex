export type AppEnvironment = 'development' | 'production' | 'staging'

export interface AppEnvironmentConfig {
  analyticsEnvironment: string
  apiBaseUrl: string
  appDisplayName: string
  bundleSuffix: string
  environment: AppEnvironment
  iosSchemeName: string
  maestroAppId: string
  sentryEnvironment: string
}
