# Design Systems Pending

These items are intentionally tracked as pending because they require cross-team adoption, publishing infrastructure, or org-wide review workflows beyond app-level code alone.

## Pending Rollout Work
- Convert the conceptual design-system model into a real shared package or workspace library used by multiple production surfaces.
- Add a real documentation/catalog surface, such as Storybook or an internal design-system site, if the organization requires discoverability and QA review.
- Add visual regression or review automation if the design system must enforce pixel-level consistency across releases.
- Define semver and breaking-change policy for shared tokens and primitives once multiple product teams consume the system.
- Validate how domain-owned compositions graduate into stable design-system assets over time.

## Why These Are Pending
- They cannot be completed honestly from repository code alone.
- They depend on org-wide adoption, publishing tooling, and cross-team governance.
