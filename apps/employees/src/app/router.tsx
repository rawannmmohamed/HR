import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import DashboardRoutes from "@/features/dashboard/routes";

const router = createBrowserRouter([...DashboardRoutes.routes]);

export function AppRouter() {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
