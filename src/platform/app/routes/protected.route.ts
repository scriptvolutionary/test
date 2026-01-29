import { createRoute, Outlet, redirect } from "@tanstack/react-router";

import { useAuthStore } from "@/platform/auth/store";

import { rootRoute } from "./root.route";

export const protectedRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: "protected",
	beforeLoad: async ({ location }) => {
		const { user } = useAuthStore.getState();

		if (user === null) {
			return redirect({
				to: "/log-in",
				search: { redirect: location.pathname },
			});
		}
	},
	component: Outlet,
});
