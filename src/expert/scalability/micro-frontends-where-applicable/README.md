# Micro-frontends where applicable

This folder contains the `Micro-frontends where applicable` topic from `Expert -> Scalability`.

## What We Did
- Added an expert-level mobile micro-frontend applicability model.
- Added typed contracts for slice composition modes, shared-contract dependencies, and boundary rules.
- Added a micro-frontend applicability console example screen.
- Added this topic summary file and a pending tracker.

## What This Covers
- shell-composed domain slices
- feature-flagged slice release boundaries
- separate-app surfaces where they make more sense than shell federation
- explicit guidance about when micro-frontend patterns fit mobile and when they do not

## Current Structure
- `README.md`
- `microFrontendContracts.ts`
- `microFrontendModel.ts`
- `01_MicroFrontendApplicabilityConsole.tsx`
- `PENDING.md`

## Notes
- This topic intentionally treats mobile micro-frontends differently from web remote-module federation.
- Real runtime federation, multi-app shell extraction, or production slice loader infrastructure is tracked in `PENDING.md`.

## Update Rule
- This file is the running summary for the `micro-frontends-where-applicable` folder.
- Whenever files or examples are added, removed, or changed inside this folder, this `README.md` should be updated to reflect the latest state.
