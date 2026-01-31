import { createRoute, Outlet } from "@tanstack/react-router";

import { moduleRoute } from "@/platform/sdk/routes";
import { useSessionStore } from "@/platform/sdk/store";

export const rootRoute = createRoute({
	getParentRoute: () => moduleRoute,
	path: "/",
	beforeLoad: () => {
		useSessionStore.getState().setModule("agro");
	},
	component: Outlet,
});

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <div>AGRO</div>,
});
