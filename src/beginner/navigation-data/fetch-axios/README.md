# Fetch and Axios

Focus areas:
- Basic GET request
- Loading state
- Error state
- Empty state
- Mapping API data into UI
- Understanding `fetch` vs `axios`

Industry notes:
- A production-style app should not scatter network calls directly across many components.
- Even at beginner level, it is better to separate API calls from UI code where possible.
- The app can begin with native `fetch` and later adopt `axios` if needed.

Suggested next implementation:
- create a small API client helper
- fetch a list of items from a public API
- show loading, error, success, and empty states
- normalize the returned data shape before rendering
