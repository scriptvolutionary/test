import { createRouter } from "@tanstack/react-router";

import { ErrorPageComponent } from "@/platform/pages/errors/error";
import { NotFoundPageComponent } from "@/platform/pages/errors/not-found";
import {
	moduleRoute,
	platformRoute,
	platformRouteTree,
	publicRouteTree,
	rootRoute,
} from "@/platform/sdk/routes";

import { getEnabledModules } from "@/app/modules/registry";

function createAppRouter() {
	const enabledModules = getEnabledModules();

	const routeTree = rootRoute.addChildren([
		...publicRouteTree,

		platformRoute.addChildren([
			...platformRouteTree,
			moduleRoute.addChildren(enabledModules.map((m) => m.routeTree)),
		]),
	]);

	return createRouter({
		routeTree,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		context: undefined!,
		defaultNotFoundComponent: NotFoundPageComponent,
		defaultErrorComponent: ErrorPageComponent,
	});
}

export const router = createAppRouter();
