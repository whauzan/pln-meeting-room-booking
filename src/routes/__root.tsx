import {
  createRootRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NotFound from "../shared/components/errors/NotFound";

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/") {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: NotFound,
});
