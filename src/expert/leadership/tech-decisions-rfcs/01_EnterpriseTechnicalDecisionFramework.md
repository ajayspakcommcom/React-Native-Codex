# Enterprise Technical Decision Framework

## Objective
- Make technical decisions transparent, reviewable, and durable.
- Separate fast opinions from decisions that affect architecture, staffing, release risk, or platform direction.

## When a decision needs an RFC
- it changes the default architecture
- it introduces or removes a core dependency
- it affects release risk, security posture, or operational ownership
- it changes the boundaries between teams
- it creates long-term platform cost

## Decision principles
- optimize for reversibility when uncertainty is high
- optimize for long-term clarity when a decision is hard to reverse
- prefer explicit trade-offs over vague optimism
- identify the owner, not just the idea
- capture operational cost, not only implementation cost

## Enterprise operating model
1. Author frames the problem, not only the preferred solution.
2. Alternatives are documented with explicit trade-offs.
3. Reviewers are chosen by ownership boundary, not popularity.
4. The decision records rollout plan, risk, and reversal path.
5. The final decision is archived and referenced by future work.

## Required sections
- problem statement
- business and engineering context
- decision drivers
- considered options
- chosen option
- risks and mitigation
- rollout plan
- ownership and follow-up
- rollback or reversal strategy

## Review rules
- platform decisions need platform review
- security-sensitive decisions need security review
- cross-team boundary changes need affected-team signoff
- decisions should expire for re-evaluation if the assumptions are time-sensitive

## Anti-patterns
- using an RFC to justify a decision that is already irreversible
- hiding trade-offs behind “industry standard” language
- skipping operational ownership
- documenting the solution but not the failure modes
