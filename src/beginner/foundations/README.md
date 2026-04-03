# Foundations

This folder contains the Foundations part of the Beginner roadmap.

## What We Did
- Created the `foundations` folder inside `src/beginner`.
- Split the Foundations section into topic-based subfolders.
- Added one `README.md` file inside each topic folder.
- Added one real-world React Native `.tsx` example inside each topic folder.
- Added a `shared` folder for reusable theme tokens and UI primitives.
- Refactored the examples toward a more industry-style structure.
- Kept `CLI vs Expo (start with Expo)` out of this section for now, based on the current request.

## Current Topics
- JavaScript (ES6+) and TypeScript basics
- React fundamentals
- React Native core components
- Styling with Flexbox and `StyleSheet`
- Platform basics: Android vs iOS differences

## Current Structure
- `javascript-typescript`
- `react-fundamentals`
- `react-native-core`
- `styling`
- `platform-basics`
- `shared`

## Real-World Examples Added
- `javascript-typescript/01_OrderSummary.tsx`
  E-commerce order summary using interfaces, typed props, arrays, calculations, and reusable helpers.
- `react-fundamentals/01_TaskBoard.tsx`
  Task board using JSX, components, props, state, list rendering, conditional rendering, and events.
- `react-native-core/01_TravelFeed.tsx`
  Travel feed using `View`, `Text`, `Image`, `ScrollView`, and `FlatList`.
- `styling/01_RestaurantCard.tsx`
  Card-based restaurant UI focused on layout, spacing, typography, chips, and `StyleSheet.create`.
- `platform-basics/01_PlatformAwareLogin.tsx`
  Cross-platform login screen showing `Platform`, safe area handling, status bar differences, and keyboard behavior.

## Shared Foundation Layer
- `shared/theme.ts`
  Centralized colors, spacing, radius values, and card shadow tokens.
- `shared/ui.tsx`
  Reusable `FoundationCard`, `SectionHeader`, `Pill`, and `PrimaryButton` components.

## Industry-Standard Improvements
- Reduced repeated colors, spacing, and card styles by moving them into shared tokens.
- Reused common UI patterns instead of duplicating card, pill, and button markup in every example.
- Improved separation between domain logic and presentation.
- Added clearer accessibility roles and labels in interactive elements.
- Added stronger input behavior and validation patterns in the platform example.
- Moved the examples closer to a maintainable, scalable component style instead of one-off demo code.

## Excluded For Now
- `CLI vs Expo (start with Expo)`

## Update Rule
- This file is the running summary for the `foundations` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
