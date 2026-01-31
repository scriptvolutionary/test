import { createRoute, Outlet, redirect } from "@tanstack/react-router";

import { sessionMeQueryOptions } from "@/platform/entities/session";

import { rootRoute } from "./root";

export const protectedRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: "protected",
	beforeLoad: async ({ location, context: { queryClient } }) => {
		const me = await queryClient.ensureQueryData(sessionMeQueryOptions());

		if (!me) {
			return redirect({
				to: "/log-in",
				search: { redirect: location.href },
			});
		}
	},
	component: Outlet,
});
