import type {ScalabilityPatternModel} from './patternContracts';

export const scalabilityPatternModel: ScalabilityPatternModel = {
  boundedContexts: [
    {
      id: 'shell-navigation',
      name: 'App shell and navigation',
      owningLayer: 'shell',
      ownerTeam: 'mobile-platform',
      responsibility:
        'Bootstraps the app, wires navigation, establishes session guards, and composes domain entrypoints.',
      dependencies: ['design-system', 'observability-core', 'runtime-config'],
    },
    {
      id: 'identity-session',
      name: 'Identity and session',
      owningLayer: 'platform',
      ownerTeam: 'identity-platform',
      responsibility:
        'Owns login, session lifecycle, secure token usage, entitlement checks, and auth-driven routing.',
      dependencies: ['secure-storage', 'network-core', 'observability-core'],
    },
    {
      id: 'operations-domain',
      name: 'Operations domain',
      owningLayer: 'domain',
      ownerTeam: 'operations-experience',
      responsibility:
        'Owns operational workflows, incident dashboards, execution surfaces, and domain-specific sync behavior.',
      dependencies: ['identity-session', 'network-core', 'design-system'],
    },
    {
      id: 'commerce-domain',
      name: 'Commerce domain',
      owningLayer: 'domain',
      ownerTeam: 'commerce-mobile',
      responsibility:
        'Owns catalog, checkout, pricing presentation, and post-purchase customer flows.',
      dependencies: ['identity-session', 'network-core', 'design-system'],
    },
    {
      id: 'shared-design-system',
      name: 'Design system',
      owningLayer: 'shared',
      ownerTeam: 'design-platform',
      responsibility:
        'Owns tokens, primitives, layout contracts, interaction standards, and visual consistency across domains.',
      dependencies: [],
    },
    {
      id: 'observability-core',
      name: 'Observability core',
      owningLayer: 'observability',
      ownerTeam: 'mobile-platform',
      responsibility:
        'Owns logging, metrics, crash context, feature health, and rollout signal collection.',
      dependencies: [],
    },
  ],
  deploymentSurfaces: [
    {
      id: 'mobile-shell',
      title: 'Mobile shell release',
      releaseCadence: 'coordinated app-store release',
      failureBlastRadius: 'high',
      owner: 'mobile-platform',
    },
    {
      id: 'feature-flag-rollout',
      title: 'Flag-gated domain rollout',
      releaseCadence: 'continuous after app release',
      failureBlastRadius: 'medium',
      owner: 'respective domain team',
    },
    {
      id: 'ota-content',
      title: 'OTA JavaScript update',
      releaseCadence: 'controlled operational rollout',
      failureBlastRadius: 'high',
      owner: 'release-engineering',
    },
  ],
  operatingPrinciples: [
    'A large mobile app scales when bounded contexts own behavior, not just files.',
    'The app shell should orchestrate domains, not absorb their business logic.',
    'Shared layers should stay small and stable; domain-specific logic should not drift into generic utilities.',
    'Release surfaces and blast radius should be explicit, because team autonomy depends on controlled failure boundaries.',
  ],
};
