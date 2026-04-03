# Android Artifact Workflow

This guide documents the Android release structure introduced for the `Builds` section.

## Flavor Model
- `development`
- `staging`
- `production`

## Artifact Commands
- Development APK:
  `npm run build:android:apk:development`
- Staging APK:
  `npm run build:android:apk:staging`
- Production APK:
  `npm run build:android:apk:production`
- Production AAB:
  `npm run build:android:aab:production`

## Why APK vs AAB
- `APK` is useful for internal distribution, QA, and side-loading.
- `AAB` is the standard artifact for Google Play production delivery.

## Signing Strategy
- Local machines can fall back to debug signing when release signing properties are not present.
- Enterprise release builds should provide:
  - `RELEASE_STORE_FILE`
  - `RELEASE_STORE_PASSWORD`
  - `RELEASE_KEY_ALIAS`
  - `RELEASE_KEY_PASSWORD`

## Enterprise Notes
- Product flavors should mirror real deployment environments.
- Artifact generation should be scriptable and CI-friendly.
- Release signing material should never be hardcoded into the repository.
- Production AAB generation should be the canonical store-delivery path.
