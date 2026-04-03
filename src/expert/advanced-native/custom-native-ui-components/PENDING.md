# Pending Work

The core custom native UI component architecture is implemented, but these larger rollout items are still pending:

- Xcode build verification for the iOS native view manager and view files
- real-device validation for visual parity between Android and iOS
- accessibility audit for dynamic type, VoiceOver/TalkBack labels, and reduced motion policy if animated native transitions are added later
- Fabric-spec and codegen migration if this native surface is promoted from bridge interop to a full New Architecture native component contract
- snapshot and visual-regression coverage for the native surface across product themes and size classes
- design-token synchronization if the component is adopted into a broader enterprise design system
