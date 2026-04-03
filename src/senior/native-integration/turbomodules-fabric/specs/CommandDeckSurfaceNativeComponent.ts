import type {
  CodegenTypes,
  HostComponent,
  ViewProps,
} from 'react-native';
import {codegenNativeComponent} from 'react-native';

export interface CommandDeckSurfaceChangeEvent {
  deckLevel: string;
  visibleItemCount: CodegenTypes.Int32;
  lastInteractionLatencyMs: CodegenTypes.Double;
}

export interface NativeProps extends ViewProps {
  initialDeckLevel?: string;
  commandCount: CodegenTypes.Int32;
  onSurfaceMetricsChange?: CodegenTypes.BubblingEventHandler<CommandDeckSurfaceChangeEvent>;
}

export default codegenNativeComponent<NativeProps>(
  'CommandDeckSurface',
) as HostComponent<NativeProps>;
