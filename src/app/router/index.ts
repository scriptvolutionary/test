import { createRouter } from "@tanstack/react-router";

import {
	platformPublicRouteTree,
	protectedRoute,
	rootRoute,
} from "@/platform/app/routes";
import { ErrorPageComponent } from "@/platform/pages/error";
import { NotFoundPageComponent } from "@/platform/pages/not-found";

import { getEnabledModules } from "@/app/modules/registry";

function createAppRouter() {
	const enabledModules = getEnabledModules();

	const routeTree = rootRoute.addChildren([
		...platformPublicRouteTree,
		protectedRoute.addChildren(enabledModules.map((m) => m.routeTree)),
	]);

	return createRouter({
		routeTree,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		scrollRestoration: true,
		context: undefined!,
		defaultNotFoundComponent: NotFoundPageComponent,
		defaultErrorComponent: ErrorPageComponent,
	});
}

export const router = createAppRouter();
