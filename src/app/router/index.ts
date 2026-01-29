import { createRouter } from "@tanstack/react-router";

import { protectedRoute, rootRoute } from "@/platform/app/routes";

import { getEnabledModules } from "@/app/modules";

import { ErrorPageComponent } from "../pages/error";
import { NotFoundPageComponent } from "../pages/not-found";
import { forbiddenRoute, loginRoute } from "./routes";

const enabledModules = getEnabledModules();

const routeTree = rootRoute.addChildren([
	loginRoute,
	forbiddenRoute,
	protectedRoute.addChildren(enabledModules.map((m) => m.routeTree)),
]);

export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	context: undefined!,
	defaultNotFoundComponent: NotFoundPageComponent,
	defaultErrorComponent: ErrorPageComponent,
});
