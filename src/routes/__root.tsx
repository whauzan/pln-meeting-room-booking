import {
  createRootRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NotFound from "../shared/components/errors/NotFound";
import AppLayout from "../shared/components/layout/AppLayout";

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/") {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: () => (
    <AppLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </AppLayout>
  ),
  notFoundComponent: NotFound,
});
