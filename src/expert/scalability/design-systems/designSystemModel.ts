import type {DesignSystemOperatingModel} from './designSystemContracts';

export const designSystemOperatingModel: DesignSystemOperatingModel = {
  tokenGroups: [
    {
      id: 'foundation-tokens',
      tier: 'foundations',
      title: 'Foundation tokens',
      ownerTeam: 'design-platform',
      examples: ['spacing scale', 'radius scale', 'motion durations', 'base color ramps'],
    },
    {
      id: 'semantic-tokens',
      tier: 'semantic',
      title: 'Semantic tokens',
      ownerTeam: 'design-platform',
      examples: ['surface/foreground', 'success/warning/danger', 'interactive emphasis'],
    },
    {
      id: 'component-tokens',
      tier: 'component',
      title: 'Component-level tokens',
      ownerTeam: 'design-platform',
      examples: ['button density', 'card elevation', 'modal spacing contract'],
    },
  ],
  componentContracts: [
    {
      id: 'primitive-button',
      title: 'Primitive button',
      ownerTeam: 'design-platform',
      supportedPlatforms: ['ios', 'android'],
      status: 'stable',
      dependencies: ['foundation-tokens', 'semantic-tokens'],
    },
    {
      id: 'app-shell-header',
      title: 'App shell header',
      ownerTeam: 'design-platform',
      supportedPlatforms: ['ios', 'android', 'tablet'],
      status: 'stable',
      dependencies: ['semantic-tokens', 'motion primitives', 'navigation contracts'],
    },
    {
      id: 'operations-summary-card',
      title: 'Operations summary card',
      ownerTeam: 'operations-experience',
      supportedPlatforms: ['ios', 'android'],
      status: 'experimental',
      dependencies: ['primitive-card', 'iconography system', 'semantic-tokens'],
    },
  ],
  distributionSurfaces: [
    {
      id: 'source-package',
      channel: 'workspace source package',
      consumerScope: 'all mobile domains',
      releaseRule: 'breaking changes require migration notes and semver governance',
    },
    {
      id: 'storybook-or-catalog',
      channel: 'design system catalog',
      consumerScope: 'design, QA, and engineering',
      releaseRule: 'stable components must be documented before adoption',
    },
    {
      id: 'release-train',
      channel: 'app release train',
      consumerScope: 'all production consumers',
      releaseRule: 'token and primitive changes roll out through the same release governance as shell changes',
    },
  ],
  operatingPrinciples: [
    'A design system is a governed product, not a folder of reusable components.',
    'Token tiers should be explicit so product teams do not bypass semantic meaning and couple directly to raw values.',
    'Stable primitives and domain-owned compositions should be separated so the design system does not absorb every feature-specific widget.',
    'Distribution and documentation are part of the system. A component that cannot be discovered, versioned, and reviewed is not functioning as a design-system asset.',
  ],
};
