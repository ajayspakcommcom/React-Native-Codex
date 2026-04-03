# UI/UX

This folder contains the `UI/UX` part of the Mid-Level roadmap.

## What We Did
- Created the `ui-ux` folder inside `src/mid-level`.
- Started this section one topic at a time.
- Created the first topic folder: `animations`.
- Created the second topic folder: `responsive-layouts`.
- Created the third topic folder: `theming`.
- Added this section summary file as the running log for this folder.

## Current Topics
- Animations
- Responsive layouts
- Dark mode, theming

## Current Structure
- `animations`
- `responsive-layouts`
- `theming`
- `shared`

## Notes
- UI and motion examples in this section should feel product-driven, not like isolated animation demos.
- Reanimated requires native rebuilds and the Worklets Babel plugin in this bare React Native setup.
- The `animations` topic now includes shared motion tokens, reduced-motion support, and gesture-driven interactions.
- The `responsive-layouts` topic focuses on compact vs wide layouts, flexible section composition, and adaptive spacing rules.
- The `theming` topic focuses on a typed theme contract, provider, persisted preference, and reusable themed primitives.
- Shared UI/UX design-system primitives now live under `ui-ux/shared`.

## Update Rule
- This file is the running summary for the `ui-ux` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
