import { createRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { rootRoute } from "@/platform/app/routes";
import { useAuthStore } from "@/platform/auth/store";

import { LoginPageComponent } from "@/app/pages/login";

export const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/login",
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
