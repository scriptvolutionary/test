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

export const platformRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "platform",
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

export const platformIndexRoute = createRoute({
	getParentRoute: () => platformRoute,
	path: "/",
	component: () => <>platform route</>,
});

export const moduleRoute = createRoute({
	getParentRoute: () => platformRoute,
	path: "m",
	beforeLoad: ({ location }) => {
		const raw = getModuleFromLocation(location.pathname);

		if (!raw) {
			const next = pickDefaultModule();
			throw redirect({ to: `/platform/m/${next}` });
		}

		const key = raw as Module;
		if (!runtime.enabledModuleKeys.includes(key)) {
			throw notFound();
		}

		const current = useSessionStore.getState().module;
		if (current !== key) {
			useSessionStore.getState().setModule(key);
		}
	},
});

function pickDefaultModule(): Module {
	const preferred = useSessionStore.getState().module;
	return runtime.enabledModuleKeys.includes(preferred)
		? preferred
		: runtime.enabledModuleKeys[0];
}

function getModuleFromLocation(pathname: string): string | null {
	const parts = pathname.split("/").filter(Boolean);

	return parts[2] ?? null;
}
