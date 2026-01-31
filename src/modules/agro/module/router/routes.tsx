import { createRoute, redirect } from "@tanstack/react-router";

import { protectedRoute } from "@/platform/app/routes";

export const rootRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "a",
	beforeLoad: ({ location }) => {
		throw redirect({ to: "/forbidden", search: { from: location.pathname } });
	},
	component: () => <div>AGRO</div>,
});
