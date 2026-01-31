import {
	createRoute,
	notFound,
	Outlet,
	redirect,
} from "@tanstack/react-router";

import { getAuthToken } from "@/platform/infra/auth-token";
import { type Module, runtime } from "@/platform/infra/config";

import { rootRoute } from ".";
import { useSessionStore } from "../state";

export const protectedRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: "protected",
	beforeLoad: async ({ location }) => {
		const token = getAuthToken();

		if (!token) {
			throw redirect({
				to: "/log-in",
				search: { redirect: location.href },
			});
		}
	},
	component: Outlet,
});

export const platformRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "platform",
	component: () => <>platform route</>,
});

export const modulesRoute = createRoute({
	getParentRoute: () => platformRoute,
	path: "m",
	beforeLoad: () => {
		const next = useSessionStore.getState().module;

		throw redirect({ to: `/platform/m/${next}` });
	},
});

export const moduleRoute = createRoute({
	getParentRoute: () => modulesRoute,
	path: "$module",
	beforeLoad: ({ params }) => {
		const key = params.module as Module;

		if (!runtime.enabledModuleKeys.includes(key)) {
			throw notFound();
		}

		useSessionStore.getState().setModule(key);
	},
	component: Outlet,
});
