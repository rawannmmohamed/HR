import { ROUTER_CONSTANTS } from "@/constants/routerConstants";
import { lazy } from "@/utils/lazyWithRetry";
import type { RouteObject } from "react-router";

const Login = lazy(() => import("./Login"));

const authRoutes: RouteObject[] = [
  {
    path: ROUTER_CONSTANTS.AUTH.SIGN_IN,
    element: <Login />,
  },
];

const AuthRoutes = Object.assign(() => null, {
  routes: authRoutes,
});

export default AuthRoutes;
