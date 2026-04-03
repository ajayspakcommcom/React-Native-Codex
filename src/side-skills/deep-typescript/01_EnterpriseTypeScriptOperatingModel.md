# Enterprise TypeScript Operating Model

## Objective
- Use TypeScript to make system boundaries explicit and reduce ambiguity at scale.
- Treat types as part of architecture, not just editor autocomplete.

## Enterprise principles
- model the domain first, not only component props
- prefer explicit contracts over loosely shaped objects
- separate internal implementation types from public module types
- use discriminated unions when behavior depends on state or mode
- avoid `any` in production code unless it is intentionally isolated and documented

## Team-scale rules
- shared types should have clear ownership
- public types should change carefully because they are part of the API surface
- utility types should simplify code, not hide business meaning
- generated types should be separated from handwritten domain contracts

## Good patterns
- branded identifiers for critical IDs when confusion risk is high
- union-based async state modeling instead of multiple unrelated booleans
- typed service responses that distinguish transport shape from domain shape
- typed config contracts for environments, flags, and release controls

## Anti-patterns
- using `Record<string, unknown>` where a real contract is known
- overusing generic abstractions that make product logic harder to understand
- leaking backend response types directly into UI code
- adding types that look sophisticated but do not improve safety or clarity

## Leadership rule
- strong TypeScript usage should make the codebase easier to reason about for the next engineer, not only harder to misuse for the current one
