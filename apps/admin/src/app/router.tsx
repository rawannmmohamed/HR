import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "@/features/auth/layouts/AuthLayout";
import AuthRoutes from "@/features/auth/routes";
import DashboardRoutes from "@/features/dashboard/routes";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicOnlyRoute from "./PublicOnlyRoute";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [...DashboardRoutes.routes],
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [...AuthRoutes.routes],
      },
    ],
  },
]);

export function AppRouter() {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
