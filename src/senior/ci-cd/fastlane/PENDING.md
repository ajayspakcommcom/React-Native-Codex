# Fastlane Pending

These items are intentionally not marked as completed because they require external credentials, signing assets, store access, or live release verification.

## Pending Rollout Work
- Run `bundle install` and lock the exact Fastlane gem versions with a generated `Gemfile.lock`.
- Verify Fastlane lane execution end to end on this machine for:
- `fastlane android staging_apk`
- `fastlane android production_aab`
- `fastlane ios build_ipa`
- Replace placeholder values in `fastlane/.env.example` with real organization-specific release secrets through CI or secure local environment management.
- Provision the real Android release keystore and confirm signed release artifact generation through Fastlane.
- Create the real Match signing repository and verify certificate/profile sync for the iOS lane.
- Replace the default iOS bundle identifier with the real production identifier and align it with provisioning.
- Add App Store Connect API key or Apple authentication strategy actually used by the team.
- Add Play Console upload lanes if the team wants artifact upload inside Fastlane instead of keeping Fastlane build-only.
- Add CI execution and artifact publishing around these lanes once `GitHub Actions` is implemented in the next topic.

## Why These Are Pending
- They cannot be honestly completed from repository code alone.
- They depend on organization-owned secrets, certificates, provisioning, or store accounts.
- They require end-to-end execution against real release infrastructure.
