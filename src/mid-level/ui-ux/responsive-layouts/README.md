# Responsive Layouts

This is the second topic inside `Mid-Level -> UI/UX`.

## Focus Areas
- compact vs wide screen behavior
- adaptive spacing and content density
- flexible section composition
- reusable layout decisions instead of one-off device checks
- layouts that hold up on phones and larger screens

## What We Added
- Added a responsive product-style screen:
  `01_AdaptiveOperationsWorkspace.tsx`
- Added shared responsive foundation files:
  `../shared/layoutTokens.ts`
  `../shared/useResponsiveFoundation.ts`
  `../shared/ResponsivePage.tsx`
  `../shared/ResponsiveSplitLayout.tsx`

## Current Files
- `README.md`
- `01_AdaptiveOperationsWorkspace.tsx`

## Implementation Notes
- The screen now uses a shared responsive foundation hook instead of local breakpoint logic.
- Container width, horizontal padding, section gaps, and card sizing come from shared layout tokens.
- Compact layouts stack sections vertically; wide layouts split the screen into columns via a reusable split-layout primitive.
