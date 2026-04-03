# Enterprise GitHub Actions Workflow

This topic adds repository-native CI/CD orchestration on top of the Fastlane and build setup already present in the project.

## Workflow Set

### `ci`
- Runs on pull requests to `main` and pushes to `main` and `codex/**`.
- Installs dependencies with `npm ci`.
- Runs:
- `npm run lint`
- `npx tsc --noEmit`
- `npm test -- --runInBand`
- Uses concurrency cancellation so stale CI runs do not waste runner time.

### `release-android`
- Runs through `workflow_dispatch`.
- Supports:
- `staging_apk`
- `production_aab`
- Uses Java, Node, Ruby, Gradle cache, and Fastlane.
- Builds through the Fastlane lanes already defined in the repo.
- Uploads the produced artifact back to the workflow run when requested.

### `release-ios`
- Runs through `workflow_dispatch`.
- Supports `app-store` and `ad-hoc` export methods.
- Uses a macOS runner, Ruby, CocoaPods, and Fastlane.
- Builds the IPA through the existing Fastlane lane.
- Uploads the IPA back to the workflow run when requested.

## Why This Is Enterprise Style
- CI and release automation are versioned with the application code.
- Release jobs are separated from pull-request quality checks.
- Secrets are injected through GitHub Actions secrets instead of being stored in the repo.
- Concurrency and artifact handling are explicitly defined.
- Android and iOS releases align with the build and signing strategy already modeled in the repo.

## Relationship To Fastlane
- GitHub Actions acts as the orchestrator.
- Fastlane remains the release-automation layer for Android and iOS build logic.
- This keeps workflow YAML focused on runner setup, caching, secrets, and artifact publication.
