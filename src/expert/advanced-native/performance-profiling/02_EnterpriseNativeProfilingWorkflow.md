# Enterprise Native Profiling Workflow

## Objective
- Use the right profiler for the right class of problem.
- Profile release-like builds instead of relying on dev-mode behavior.
- Treat captures, symbols, and traces as operational artifacts that support regression analysis.

## Tool selection
- `Flipper`
- Use for fast development-time logs, network inspection, and plugin-based inspection while triaging a native-heavy issue.
- Do not treat it as the final authority for deep iOS or Android performance analysis.

- `Xcode Instruments`
- Use for iOS CPU, memory, hangs, hitches, responsiveness, and event-loop investigation.
- Prefer release or profile builds when a regression matters.

- `Android Profiler`
- Use for Android CPU, heap, allocation, network, and frame analysis.
- Prefer real-device runs when a problem only appears under realistic hardware pressure.

## Run order
1. Reproduce the issue on a release-like build.
2. Identify whether the first symptom is JS, native CPU, native memory, rendering, or networking.
3. Choose the profiler that matches the first symptom.
4. Capture traces with a focused scenario, not a general exploratory session.
5. Save trace artifacts and record the device, build, commit, and scenario steps.
6. Convert findings into budgets or regression checks if the issue is likely to recur.

## Enterprise rules
- Never conclude from a single simulator-only profiling session when the issue matters in production.
- Keep symbols, dSYMs, and build metadata tied to the captured run.
- Use scenario-specific captures: launch, scroll, navigation, memory churn, backgrounding, or network spikes.
- Treat profiler output as evidence, not intuition.

## Current repo note
- This repo now includes the profiling architecture and runbook.
- Local desktop-tool setup and real trace capture remain environment-dependent follow-up work and are tracked in `PENDING.md`.
