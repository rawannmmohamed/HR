# Agent Instructions

This file is the source of truth for agents working on the HR system. Read it before making structural or implementation changes.

## Project Direction

- Preserve the Nx monorepo structure.
- Preserve the two-portal model: `apps/admin` and `apps/employees`.
- Preserve `packages/shared` for code that is truly reusable across portals.
- Work feature-by-feature.
- Keep changes scoped to the requested feature.
- Do not introduce new frameworks without approval.

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

## Feature-Based Rules

Each feature owns its own UI, hooks, local store, route definitions, types, helpers, and API bindings when they are specific to that feature.

Portal `App.tsx` files should stay thin. They should bootstrap the portal and render route-level feature components rather than contain full screens.

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

- `dashboard`
- `employee-records`
- `attendance`
- `leave-requests`
- `leave-balances`
- `contracts`
- `reports`
- `profile`

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

- Use local React state only for temporary UI state such as active tabs, search input, filters, and open panels.
- Use Zustand for client state that must be shared across components or routes.
- Use React Query for server state from the .NET API.
- Do not duplicate React Query server data into Zustand unless there is a clear UI-state reason.
- Do not add global state before it is needed.

React Query server state will eventually include:

- Employee records
- Attendance logs
- Leave requests
- Leave balances
- Contracts
- Reports

## API Rules

The .NET backend owns business rules, auth, persistence, and protected API access.

- Keep endpoint bindings near the feature that uses them.
- Move only shared API primitives into `packages/shared`.
- Keep request and response types explicit.
- Prefer typed query keys for React Query.
- Keep backend naming consistent with the .NET contracts.
- Keep `api` folders for fetching only.
- Keep request/response/domain types in a separate `types` folder.
- Keep reusable utility functions in separate utility files.

## Auth Rules

- Use JWT access tokens for API authorization.
- Use HTTP-only refresh-token cookies; do not store refresh tokens in local storage, session storage, or Zustand.
- Keep the access token in memory through the auth store.
- Use global Axios interceptors to attach access tokens and refresh once on `401`.
- Determine portal access from the backend user role claim/response:
  - `HR Admin` can access the admin portal.
  - `Employee` can access the employee portal.
- Protect portal routes with explicit public and protected route wrappers.
- The employee dashboard must use the authenticated employee from the JWT, not a frontend-supplied employee number.

## Nx Rules

- Use Nx targets instead of direct app commands when possible.
- Use `npm run dev:admin` for the admin portal.
- Use `npm run dev:employees` for the employee portal.
- Use `npm run build` to build all buildable projects.
- Use `npm run lint` to lint all lintable projects.

Useful direct Nx commands:

```bash
npx nx serve admin
npx nx serve employees
npx nx build admin
npx nx build employees
npx nx run-many -t build
npx nx run-many -t lint
```

## Import Alias Rules

- Use `@/...` for imports inside the current portal.
- In `apps/admin`, `@/...` points to `apps/admin/src/...`.
- In `apps/employees`, `@/...` points to `apps/employees/src/...`.
- Use `@hr/shared` for shared package exports.
- Do not use `@/...` for shared code imports.

Examples:

```ts
import { LeaveRequestsRoute } from "@/features/leave-requests/routes";
import { Button } from "@hr/shared";
```

## Validation Rules

- Run `npm run build` after implementation changes.
- Run `npm run lint` when changing TypeScript or UI code.
- If a change only updates documentation, build/lint is optional unless architecture instructions changed in a way that might affect commands.
