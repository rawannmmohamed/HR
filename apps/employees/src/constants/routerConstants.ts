const createRoutePath = <TPath extends string>(path: TPath) => path;

export const ROUTER_CONSTANTS = {
  ROOT: createRoutePath("/"),
  DASHBOARD: {
    DASHBOARD: createRoutePath("/dashboard"),
  },
} as const;
