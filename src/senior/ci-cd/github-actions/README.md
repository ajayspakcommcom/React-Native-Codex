# GitHub Actions

This folder contains the `GitHub Actions` topic from `Senior -> CI/CD`.

## What We Did
- Added an enterprise-style GitHub Actions workflow set for this repository.
- Added repository workflows under `.github/workflows` for:
- quality and test checks
- Android release builds
- iOS release builds
- Added this topic summary file, a workflow guide, and a pending tracker.

## What This Covers
- Pull request and branch CI checks.
- Manual release workflow dispatch for Android artifacts.
- Manual release workflow dispatch for iOS IPA generation.
- Workflow-level concurrency, artifact publishing, and secret-driven release configuration.
- Alignment between GitHub Actions and the Fastlane setup already added to the repository.

## Current Workflows
- `ci`
- `release-android`
- `release-ios`

## Current Structure
- `README.md`
- `01_EnterpriseGitHubActionsWorkflow.md`
- `PENDING.md`

## Notes
- This topic is implemented with real workflow files, not just notes.
- Items that depend on organization-owned secrets, GitHub environment protection, or live store infrastructure are tracked in `PENDING.md`.

## Update Rule
- This file is the running summary for the `github-actions` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
