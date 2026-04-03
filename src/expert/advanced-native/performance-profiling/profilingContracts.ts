export type ProfilingToolName =
  | 'flipper'
  | 'xcode-instruments'
  | 'android-profiler';

export type ProfilingTargetArea =
  | 'ui-responsiveness'
  | 'js-runtime'
  | 'native-memory'
  | 'cpu-hotspots'
  | 'network-behavior'
  | 'frame-drops';

export interface ProfilingToolContract {
  id: ProfilingToolName;
  title: string;
  bestFor: ProfilingTargetArea[];
  executionSurface: string;
  releaseExpectation: string;
}

export interface ProfilingScenario {
  id: string;
  title: string;
  symptom: string;
  recommendedTool: ProfilingToolName;
  reason: string;
}
