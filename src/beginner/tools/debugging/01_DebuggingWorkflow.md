# Debugging Workflow

This file explains how to debug problems in this React Native project.

## Why debugging matters

Debugging is how you find out:
- why the app crashes
- why UI is not updating
- why API data is not rendering
- why navigation is not moving to the expected screen
- why user input is not behaving correctly

For a beginner, debugging starts with:
- logs
- visible runtime errors
- checking props and state
- reproducing the issue clearly

## First debugging tools to learn

### 1. `console.log`

Use `console.log` to inspect:
- values from API responses
- route params
- current component state
- button press events
- user input values

Example:

```tsx
console.log('Current email value:', email)
console.log('Fetched users:', users)
console.log('Route params:', route.params)
```

### 2. `console.warn`

Use `console.warn` when:
- something is unexpected
- a value is missing
- you want to highlight a non-fatal issue

Example:

```tsx
if (!user) {
  console.warn('User object is missing')
}
```

### 3. `console.error`

Use `console.error` when:
- a request fails
- a required value is invalid
- you want the failure to be obvious during development

Example:

```tsx
catch (error) {
  console.error('Failed to load users:', error)
}
```

## Common things to debug in this repository

### Navigation issues

Things to check:
- is the screen name correct in `navigate(...)`?
- are route params being passed correctly?
- are the params typed correctly?

Good logs:

```tsx
console.log('Navigating to details screen')
console.log('Listing params:', { listingId, city })
```

### Data fetching issues

Things to check:
- is the API request actually being called?
- did the request succeed?
- what shape did the response return?
- is the loading state getting cleared?

Good logs:

```tsx
console.log('Loading user directory with source:', source)
console.log('API response users:', nextUsers)
```

### Form issues

Things to check:
- is input state updating?
- are validation rules running?
- are error messages showing correctly?
- is the submit button disabled when it should be?

Good logs:

```tsx
console.log('Form values:', values)
console.log('Form errors:', nextErrors)
```

## Runtime error screens

In React Native, common development errors show up as a visible error screen.

Read the error in this order:
- what file is failing?
- what line is failing?
- what type of error is it?
- what was expected but missing?

Common examples:
- undefined is not an object
- cannot read property of undefined
- invalid hook call
- component import/export mismatch
- navigation route name mismatch

## React Native Dev Menu

The Dev Menu helps you during development.

You can use it for:
- reload
- opening developer tools
- debugging options
- performance overlays in some cases

Typical ways to open it:
- iOS simulator: `Cmd + D`
- Android emulator: `Cmd + M` or `Ctrl + M`

## React DevTools / React Native DevTools

Use dev tools when logs are not enough.

These tools help inspect:
- component tree
- props
- state
- rerenders

Use them when:
- a component receives wrong props
- a state value is not updating as expected
- a nested component is rendering the wrong UI

## Simple debugging process

Use this order:

1. Reproduce the issue clearly.
2. Read the exact error message.
3. Add logs around the failing area.
4. Confirm whether state, props, params, or API data are wrong.
5. Fix one thing at a time.
6. Remove noisy debug logs after the issue is solved.

## Practical beginner checklist

When something breaks:
- check Metro output
- check the visible app error screen
- check the file and line number
- add `console.log` around the failing code
- verify props and state values
- verify route params
- verify API response shape
- verify conditional rendering logic

## Example debugging targets in this project

Useful files to debug:
- `src/beginner/navigation-data/react-navigation/01_AppNavigator.tsx`
- `src/beginner/navigation-data/fetch-axios/01_UserDirectory.tsx`
- `src/beginner/navigation-data/basic-forms-validation/01_SignUpForm.tsx`

These are good beginner debugging examples because they contain:
- navigation actions
- async API requests
- local component state
- validation logic

## Important beginner rule

Do not guess.

Always confirm:
- what value is actually present
- what value is expected
- where the mismatch starts

That is the foundation of good debugging.
