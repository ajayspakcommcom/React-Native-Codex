import type {ModuleDefinition} from '../../contracts/moduleContract';
import {incidentsModule} from '../../modules/incidents/IncidentsModule';
import {workspaceModule} from '../../modules/workspace/WorkspaceModule';

export const seniorArchitectureModules: readonly ModuleDefinition[] = [
  workspaceModule,
  incidentsModule,
];
