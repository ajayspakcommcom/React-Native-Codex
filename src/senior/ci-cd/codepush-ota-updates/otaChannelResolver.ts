import type {OtaChannel, OtaLaunchPolicy} from './otaContracts';

interface OtaEnvironmentContext {
  appEnv: 'development' | 'staging' | 'production';
  internalBuild: boolean;
}

export function resolveOtaChannel(
  context: OtaEnvironmentContext,
): OtaLaunchPolicy {
  if (context.internalBuild) {
    return {
      channel: 'internal',
      applyOnNextRestart: false,
      allowCriticalImmediateApply: true,
      minimumBackgroundDurationMs: 5_000,
    };
  }

  if (context.appEnv === 'staging') {
    return {
      channel: 'staging',
      applyOnNextRestart: false,
      allowCriticalImmediateApply: true,
      minimumBackgroundDurationMs: 10_000,
    };
  }

  return {
    channel: 'production',
    applyOnNextRestart: true,
    allowCriticalImmediateApply: false,
    minimumBackgroundDurationMs: 30_000,
  };
}

export function describeChannel(channel: OtaChannel): string {
  switch (channel) {
    case 'internal':
      return 'Internal builds for engineering and QA';
    case 'staging':
      return 'Pre-production channel for release validation';
    case 'production':
      return 'Store builds receiving production-safe OTA bundles';
    default:
      return 'Unknown channel';
  }
}
