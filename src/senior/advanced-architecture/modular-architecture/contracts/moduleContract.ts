import type {ComponentType} from 'react';

import type {AppContainer} from '../core/di/appContainer';

export interface ModuleScreenProps {
  container: AppContainer;
}

export interface ModuleDefinition {
  id: string;
  title: string;
  summary: string;
  accentColor: string;
  Screen: ComponentType<ModuleScreenProps>;
}
