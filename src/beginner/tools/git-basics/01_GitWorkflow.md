# Git Workflow

This file explains the beginner Git workflow used in this repository.

## Why Git matters

Git helps you:
- track what changed
- save your work safely
- work in branches
- push your progress to GitHub
- review changes before merging

In this roadmap project, Git is important because each section is being added step by step and should be saved clearly.

## Most important beginner commands

### 1. Check current changes

```bash
git status
```

This shows:
- modified files
- new files
- deleted files
- staged vs unstaged changes

This should usually be the first Git command you run.

## 2. Stage changes

To stage all current changes:

```bash
git add -A
```

To stage one file only:

```bash
git add path/to/file
```

What staging means:
- staged changes are prepared for the next commit
- unstaged changes are not included yet

## 3. Create a commit

```bash
git commit -m "Your clear commit message"
```

Good commit messages:
- describe what changed
- stay short and direct
- focus on real work done

Examples from this project:

```bash
git commit -m "Initial React Native TypeScript setup and roadmap docs"
git commit -m "Add beginner foundations examples and setup docs"
git commit -m "Expand beginner roadmap with navigation and refinements"
```

## 4. Push changes to GitHub

If the branch already tracks a remote branch:

```bash
git push
```

If the branch is new:

```bash
git push -u origin branch-name
```

## Branch basics

Branches help separate work safely.

In this repository:
- `main` is the base branch
- feature work can be done in a separate branch
- then pushed to GitHub and reviewed through a pull request

Example branch used in this project:

```bash
codex/beginner-foundations-examples
```

To check the current branch:

```bash
git branch --show-current
```

## Practical beginner workflow

A simple safe workflow:

1. Check current changes

```bash
git status
```

2. Stage the intended work

```bash
git add -A
```

3. Commit with a clear message

```bash
git commit -m "Describe the work clearly"
```

4. Push to GitHub

```bash
git push
```

## What we actually did in this project

We used Git to:
- commit the initial bare React Native setup
- push the first version to GitHub
- create and push a feature branch
- open a draft pull request
- keep updating that branch as beginner roadmap sections were added

## Useful Git commands for this repository

Check status:

```bash
git status -sb
```

Check current branch:

```bash
git branch --show-current
```

Check remote:

```bash
git remote -v
```

Push current branch:

```bash
git push
```

## Beginner mistakes to avoid

### 1. Committing without checking status

Bad habit:
- committing without knowing what changed

Better habit:

```bash
git status
```

first.

### 2. Using vague commit messages

Bad:

```bash
git commit -m "update"
```

Better:

```bash
git commit -m "Add navigation and form validation examples"
```

### 3. Pushing without knowing the branch

Always confirm:

```bash
git branch --show-current
```

before pushing.

### 4. Mixing unrelated work in one commit

Try to keep one commit focused on one area of work.

That makes:
- review easier
- rollback easier
- project history easier to understand

## Good beginner rule

Before every commit, do this:

```bash
git status
```

If the output is not clear, do not commit yet.

Understand the changes first, then stage and commit.
