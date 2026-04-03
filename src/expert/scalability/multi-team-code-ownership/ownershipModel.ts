import type {OwnershipOperatingModel} from './ownershipContracts';

export const ownershipOperatingModel: OwnershipOperatingModel = {
  codeAreas: [
    {
      id: 'mobile-shell',
      areaName: 'App shell and navigation',
      pathPattern: 'src/app-shell/**',
      primaryTeam: 'mobile-platform',
      backupTeam: 'release-engineering',
      criticality: 'platform-critical',
      reviewRequirements: [
        'Primary team review required',
        'Release engineering notified for deep-link or startup changes',
      ],
    },
    {
      id: 'identity',
      areaName: 'Identity and secure session',
      pathPattern: 'src/domains/identity/**',
      primaryTeam: 'identity-platform',
      backupTeam: 'mobile-platform',
      criticality: 'high',
      reviewRequirements: [
        'Primary team review required',
        'Security review required for credential or token lifecycle changes',
      ],
    },
    {
      id: 'design-system',
      areaName: 'Shared design system',
      pathPattern: 'src/shared/design-system/**',
      primaryTeam: 'design-platform',
      backupTeam: 'mobile-platform',
      criticality: 'high',
      reviewRequirements: [
        'Primary team review required',
        'Consumer-team signoff required for breaking UI contract changes',
      ],
    },
    {
      id: 'operations-domain',
      areaName: 'Operations domain',
      pathPattern: 'src/domains/operations/**',
      primaryTeam: 'operations-experience',
      backupTeam: 'mobile-platform',
      criticality: 'standard',
      reviewRequirements: [
        'Primary team review required',
        'Observability signoff required for incident workflow telemetry changes',
      ],
    },
  ],
  escalationRules: [
    {
      id: 'cross-boundary-change',
      trigger: 'A change crosses owned boundaries or edits a platform-critical area',
      requiredParticipants: ['primary owner', 'affected downstream owner'],
      resolutionPath: 'Open an architecture review thread before merge approval.',
    },
    {
      id: 'security-sensitive-change',
      trigger: 'A change modifies auth, secure storage, certificate pinning, or release controls',
      requiredParticipants: ['primary owner', 'security owner', 'release owner if needed'],
      resolutionPath: 'Block merge until security-impact review is recorded.',
    },
    {
      id: 'breaking-contract-change',
      trigger: 'A shared contract or design-system API changes in a breaking way',
      requiredParticipants: ['owning team', 'consumer teams'],
      resolutionPath: 'Require migration notes and coordinated rollout approval.',
    },
  ],
  operatingPrinciples: [
    'Ownership should attach to bounded responsibilities, not just directories.',
    'Every critical area needs a backup owner so incident response never depends on one team being online.',
    'Cross-boundary changes should be visible and explicit, not hidden inside “small refactors.”',
    'A codebase only scales across teams when review rules and escalation paths are designed as seriously as runtime architecture.',
  ],
};
