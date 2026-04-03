import type {JsiArchitectureModel} from './jsiContracts';

export const jsiArchitectureModel: JsiArchitectureModel = {
  primitives: [
    {
      id: 'host-function',
      primitive: 'host-function',
      title: 'Host functions',
      description:
        'Native code exposes callable functions directly into the JavaScript runtime without the old serialized bridge queue.',
      ownership: 'native',
    },
    {
      id: 'host-object',
      primitive: 'host-object',
      title: 'Host objects',
      description:
        'Native code can surface object-like APIs to JavaScript with lazy property access and native-backed state.',
      ownership: 'native',
    },
    {
      id: 'turbo-module-binding',
      primitive: 'turbo-module-binding',
      title: 'TurboModule bindings',
      description:
        'Generated native specs can bind module methods through JSI so product code reaches native capabilities with lower overhead.',
      ownership: 'shared',
    },
    {
      id: 'runtime-global',
      primitive: 'runtime-global',
      title: 'Runtime global installation',
      description:
        'A JSI installer can register globals or utility surfaces directly into the JS runtime during app startup.',
      ownership: 'shared',
    },
  ],
  designNotes: [
    'JSI is not itself a feature module. It is the low-level interface that allows direct JavaScript-to-native interaction inside the runtime.',
    'Enterprise code should hide raw JSI usage behind stable contracts. Product screens should not know whether a capability comes from a host object, TurboModule, or other runtime binding.',
    'The biggest expert mistake is treating JSI as “faster bridge code” instead of a runtime integration surface with its own lifecycle, ownership, and safety concerns.',
  ],
};
