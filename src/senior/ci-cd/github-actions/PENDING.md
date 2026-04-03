# GitHub Actions Pending

These items are intentionally tracked as pending because they require live repository settings, protected environments, or organization-owned secrets.

## Pending Rollout Work
- Add the required GitHub Actions secrets for Android release signing.
- Add the required GitHub Actions secrets for iOS signing, Match access, and bundle identity.
- Create GitHub Environments such as `staging` and `production` if the team wants manual approvals and environment protection rules.
- Add branch protection rules so `ci` becomes an enforced required status check on pull requests.
- Decide whether Android and iOS release workflows should publish to stores automatically or remain artifact-build workflows only.
- Add store-upload steps once the team confirms release ownership and account access patterns.
- Add repository-level dependency caching refinements if the CI cost profile requires more tuning.
- Run and validate all workflows in GitHub Actions against real secrets and runner infrastructure.

## Why These Are Pending
- They cannot be completed honestly from repository code alone.
- They depend on GitHub repository settings, protected environments, external credentials, or store access.
