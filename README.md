# HR System

Frontend-first HR system for employee records, attendance, leave requests, leave balance tracking, contract expiry tracking, and employee information.

The product will become a monorepo with two portals:

- `admin`: HR admin portal for employee records, attendance review, leave approvals, balances, contracts, and reports.
- `employees`: Employee self-service portal for personal profile, attendance, leave requests, leave balance, and contract/profile information.
- `shared`: Shared code used by both portals.

## Current Stack

- Frontend: React, TypeScript, Vite
- UI system: shadcn-style components, Tailwind CSS tokens, Radix primitives where needed
- Icons: lucide-react
- Future state: Zustand
- Future server state/API: React Query
- Future backend: .NET

## Target Monorepo Structure

Use this structure as the project grows:

```txt
apps/
  admin/
    src/
      app/
      features/
      routes/
      layouts/
      main.tsx
  employees/
    src/
      app/
      features/
      routes/
      layouts/
      main.tsx
packages/
  shared/
    src/
      components/
      hooks/
      lib/
      types/
      constants/
      api/
      design-system/
```

The current single Vite app is the first frontend prototype. When the monorepo split starts, move admin-specific screens into `apps/admin` and shared UI/system code into `packages/shared`.

## Feature-Based Rules

Work feature-first. Each feature owns its own UI, hooks, local store, route definitions, types, helpers, and API bindings when they are specific to that feature.

Preferred feature shape:

```txt
features/
  leave-requests/
    components/
    hooks/
    routes/
    store/
    api/
    types.ts
    constants.ts
    index.ts
```

Use this pattern for features such as:

- `employee-records`
- `attendance`
- `leave-requests`
- `leave-balances`
- `contracts`
- `reports`
- `profile`

## Portal Ownership Rules

Put code in `apps/admin` when it is only for HR admins.

Examples:

- Leave approval queue
- Employee directory management
- Contract expiry review
- Attendance exception review
- HR reports

Put code in `apps/employees` when it is only for employees.

Examples:

- My profile
- My attendance
- My leave requests
- My leave balance
- My documents

Put code in `packages/shared` only when both portals need it.

Examples:

- shadcn-style UI components
- Design tokens
- Formatting helpers
- Shared HR types
- Shared API client primitives
- Shared validation schemas
- Shared date helpers

Do not place portal-specific business logic in `shared`.

## Design System Rules

- Use shadcn-style composition for UI primitives.
- Keep base UI components small, reusable, and unopinionated.
- Use Tailwind design tokens from the global theme.
- Use lucide-react icons for buttons and navigation.
- Keep cards at `8px` radius or less unless the design system changes.
- Avoid one-off visual styles inside feature screens when a shared component or token should exist.
- Keep operational HR screens dense, clear, and easy to scan.
- Do not build marketing-style landing pages for the product workspace.

## State Rules

Use local React state only for temporary UI state such as active tabs, search input, filters, and open panels.

Use Zustand later for client state that must be shared across components or routes.

Use React Query later for server state from the .NET API:

- Employee records
- Attendance logs
- Leave requests
- Leave balances
- Contracts
- Reports

Do not duplicate React Query server data into Zustand unless there is a clear UI-state reason.

## API Rules

The .NET backend will be added later. Until then, use realistic mock data close to the eventual API shape.

When API work begins:

- Keep endpoint bindings near the feature that uses them.
- Move only shared API primitives into `packages/shared`.
- Keep request and response types explicit.
- Prefer typed query keys for React Query.
- Keep backend naming consistent with the .NET contracts.

## Agent Rules

Any future agent working on this project must follow these rules:

- Read this README before making structural changes.
- Preserve the monorepo direction: `admin`, `employees`, and `shared`.
- Work feature-by-feature, not by large generic folders.
- Put portal-specific code inside the correct portal.
- Put reusable code in `shared` only when it is truly shared.
- Keep changes scoped to the requested feature.
- Do not introduce new frameworks without approval.
- Do not add global state before it is needed.
- Do not add React Query until server/API integration begins or the user asks for it.
- Keep the shadcn-style design system consistent.
- Run `npm run build` after implementation changes.
- Run `npm run lint` when changing TypeScript or UI code.

## Current Prototype

The first prototype currently contains:

- HR admin dashboard
- Employee information table
- Attendance summary
- Leave approval queue
- Leave balance indicators
- Contract expiry alert
- Shared shadcn-style UI primitives under `src/components/ui`

## Local Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```
