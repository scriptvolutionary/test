import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	createRoute,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import z from "zod";

import { getAuthToken } from "@/platform/infra/auth-token";
import { ForbiddenPageComponent } from "@/platform/pages/forbidden";
import { LoginPageComponent } from "@/platform/pages/auth/login";

import { Devtools } from "../devtools";

export const rootRoute = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: () => (
		<>
			<Outlet />
			<Devtools />
		</>
	),
});

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	beforeLoad: () => {
		throw redirect({ to: "/platform" });
	},
});

export const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "log-in",
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
	beforeLoad: async ({ search }) => {
		const token = getAuthToken();

		if (token) {
			throw redirect({ to: search.redirect ?? "/platform" });
		}
	},
	component: LoginPageComponent,
});

export const forbiddenRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "forbidden",
	validateSearch: z.object({
		from: z.string().optional(),
	}),
	component: ForbiddenPageComponent,
});
