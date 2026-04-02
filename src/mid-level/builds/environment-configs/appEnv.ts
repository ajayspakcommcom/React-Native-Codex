import { developmentEnvironmentConfig } from './env.dev'
import type { AppEnvironment, AppEnvironmentConfig } from './env.contract'
import { productionEnvironmentConfig } from './env.production'
import { stagingEnvironmentConfig } from './env.staging'

const environmentMap: Record<AppEnvironment, AppEnvironmentConfig> = {
  development: developmentEnvironmentConfig,
  production: productionEnvironmentConfig,
  staging: stagingEnvironmentConfig,
}

export function resolveAppEnvironment(
  environment: AppEnvironment = 'development',
): AppEnvironmentConfig {
  return environmentMap[environment]
}

export const availableAppEnvironments = Object.keys(environmentMap) as AppEnvironment[]
