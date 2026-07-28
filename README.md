# HR System

Frontend-first HR system for employee records, attendance, leave requests, leave balance tracking, contract expiry tracking, and employee information.

The product is an Nx monorepo with two portals:

- `admin`: HR admin portal for employee records, attendance review, leave approvals, balances, contracts, and reports.
- `employees`: Employee self-service portal for personal profile, attendance, leave requests, leave balance, and contract/profile information.
- `shared`: Shared code used by both portals.

## Current Stack

- Monorepo: Nx
- Frontend: React, TypeScript, Vite
- UI system: shadcn-style components, Tailwind CSS tokens, Radix primitives where needed
- Icons: lucide-react
- Future state: Zustand
- Future server state/API: React Query
- Future backend: .NET

## Monorepo Structure

Current workspace shape:

```txt
apps/
  admin/
    project.json
    src/
      app/
      features/
      routes/
      layouts/
      main.tsx
  employees/
    project.json
    src/
      app/
      features/
      routes/
      layouts/
      main.tsx
packages/
  shared/
    project.json
    src/
      components/
      hooks/
      lib/
      types/
      constants/
      api/
      design-system/
nx.json
```

The admin portal contains the first HR prototype. The employees portal contains the first employee self-service shell. Shared UI primitives and utilities live in `packages/shared`.

## Architecture Notes

This project is feature-based. Each feature should own its components, hooks, routes, store, API bindings, types, and helpers when they are specific to that feature.

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

Detailed implementation and agent rules live in [AGENTS.md](./AGENTS.md).

## Current Prototype

The first prototype currently contains:

- HR admin dashboard
- Employee dashboard shell
- Employee information table
- Attendance summary
- Leave approval queue
- Leave balance indicators
- Contract expiry alert
- Shared shadcn-style UI primitives under `packages/shared/src/components/ui`

## Local Commands

```bash
npm install
npm run dev
npm run dev:admin
npm run dev:employees
npm run build
npm run lint
```

Nx project commands:

```bash
npx nx serve admin
npx nx serve employees
npx nx build admin
npx nx build employees
npx nx run-many -t build
npx nx run-many -t lint
```
