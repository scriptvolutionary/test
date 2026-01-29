import { createRoute } from "@tanstack/react-router";

import { protectedRoute } from "@/platform/app/routes";

export const rootRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "csoo",
	component: () => <div>CSOO</div>,
});
