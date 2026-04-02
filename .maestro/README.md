# Maestro E2E

This folder contains modern end-to-end flows for the app.

## Run
- Install the Maestro CLI on your machine.
- Start the app on a simulator or device.
- Run:
  `maestro test .maestro/workspace-smoke.yaml`

## Notes
- The flows target the in-app `Workspace Access Harness` screen rendered by `App.tsx`.
- The flow selectors prefer stable `id` values (`testID` in React Native) over loose text matching where possible.
