# Dark Mode, Theming

This is the third topic inside `Mid-Level -> UI/UX`.

## Focus Areas
- typed theme contract
- light and dark theme presets
- provider and theme hook
- system theme support with manual override
- persisted theme preference
- reusable themed UI primitives

## What We Added
- Added the enterprise-style theme screen:
  `01_EnterpriseThemeConsole.tsx`
- Added the theme provider and hook:
  `ThemeProvider.tsx`
  `useAppTheme.ts`
- Added typed theme contracts and theme presets:
  `themeContract.ts`
  `themePresets.ts`
- Added persisted theme preference storage:
  `themeStorage.ts`
- Added reusable themed surface primitives:
  `ThemedSurface.tsx`

## Current Files
- `README.md`
- `01_EnterpriseThemeConsole.tsx`
- `ThemeProvider.tsx`
- `useAppTheme.ts`
- `themeContract.ts`
- `themePresets.ts`
- `themeStorage.ts`
- `ThemedSurface.tsx`

## Implementation Notes
- Theme mode resolution supports `system`, `light`, and `dark`.
- The provider resolves the active mode from system appearance plus any persisted override.
- Reusable surface primitives read directly from the active theme so screens do not hardcode color values.
- This topic is intended to act as an app-level theming foundation, not a one-off theme toggle demo.
