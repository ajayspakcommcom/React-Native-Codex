# Hermes Engine Tuning Pending

These items are intentionally tracked as pending because they require release-build artifact analysis, engine profiling, or deeper toolchain comparison than app-level repository code alone.

## Pending Rollout Work
- Compare Hermes release bundle artifacts, source maps, and startup behavior across multiple builds to establish an actual tuning baseline.
- Add bytecode-size and binary-size tracking to CI or release engineering if you want regressions to be caught automatically.
- Run release-build profiling on representative low-memory devices instead of relying on simulator or debug behavior.
- Add a controlled benchmark that compares warm-start, cold-start, and memory behavior before and after bundle-shape changes.
- If needed, validate whether specific libraries or polyfills introduce unexpected Hermes costs in the production dependency set.

## Why These Are Pending
- They cannot be completed honestly from repository code alone.
- They depend on release artifacts, profiling tooling, device-lab testing, and longitudinal measurement.
