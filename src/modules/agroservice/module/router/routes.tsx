import { createRoute, Outlet } from "@tanstack/react-router";

import { moduleRoute } from "@/platform/sdk/routes";

export const rootRoute = createRoute({
	getParentRoute: () => moduleRoute,
	path: "agroservice",
	component: Outlet,
});

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <div>AGRO</div>,
});
