# Enterprise Code Review Framework

## Objective
- Keep review quality high while maintaining delivery flow.
- Make code review a decision-quality process, not a style-policing ritual.

## Review priorities
- correctness
- regression risk
- security and privacy impact
- operational impact
- maintainability
- test adequacy

## Review classes
### Low-risk changes
- local refactors
- copy updates
- small UI fixes
- expectation: fast review turnaround

### Medium-risk changes
- feature changes within known boundaries
- data-flow updates
- state-management changes
- expectation: owner review plus targeted testing scrutiny

### High-risk changes
- architecture changes
- auth/security/payment flows
- release pipeline changes
- cross-team boundary changes
- expectation: explicit owner and specialist review

## Enterprise rules
- reviewers should understand the ownership boundary they are approving
- review comments should be actionable and severity-aware
- major design objections should not be hidden among minor nits
- authors should explain non-obvious trade-offs in the PR itself
- teams should measure review latency and rework loops

## Scaled review model
- local owner review for area correctness
- specialist review for security, infra, mobile release, or platform concerns
- optional batching or office-hours review for low-risk cleanup work

## Anti-patterns
- blocking on personal preference with no engineering basis
- reviewing only naming and formatting
- approving code that is not actually understood
- expecting reviewers to reconstruct missing context from diffs alone
