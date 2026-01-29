import { createRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { rootRoute } from "@/platform/app/routes";
import { useAuthStore } from "@/platform/auth/store";

import { LoginPageComponent } from "@/app/pages/log-in";

import { ForbiddenPageComponent } from "../pages/forbidden";

export const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "log-in",
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
	beforeLoad: ({ search }) => {
		const state = useAuthStore.getState();

		if (state.user) {
			return redirect({ to: search.redirect || "/" });
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
