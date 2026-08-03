import { ROUTER_CONSTANTS } from "@/constants/routerConstants";
import type { RouteObject } from "react-router";
import { lazy } from "@/utils/lazyWithRetry";

const Dashboard = lazy(() => import("./Dashboard"));

const dashboardRoutes: RouteObject[] = [
  {
    path: ROUTER_CONSTANTS.DASHBOARD.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTER_CONSTANTS.ROOT,
    element: <Dashboard />,
  },
];

const DashboardRoutes = Object.assign(() => null, {
  routes: dashboardRoutes,
});

export default DashboardRoutes;
