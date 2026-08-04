const createRoutePath = <TPath extends string>(path: TPath) => path;

export const ROUTER_CONSTANTS = {
  ROOT: createRoutePath("/"),
  AUTH: {
    SIGN_IN: createRoutePath("/sign-in"),
  },
  DASHBOARD: {
    DASHBOARD: createRoutePath("/dashboard"),
  },
} as const;
