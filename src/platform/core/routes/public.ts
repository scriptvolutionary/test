import { createRoute, redirect } from "@tanstack/react-router";
import z from "zod";

import { sessionMeQueryOptions } from "@/platform/entities/session";
import { ForbiddenPageComponent } from "@/platform/pages/forbidden";
import { LoginPageComponent } from "@/platform/pages/login";

import { rootRoute } from "./root";

function normalizeRedirect(value: unknown) {
	if (typeof value !== "string") return undefined;
	if (!value.startsWith("/")) return undefined;
	if (value.startsWith("//")) return undefined;
	return value;
}

export const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "log-in",
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
	beforeLoad: async ({ search, context: { queryClient } }) => {
		const me = await queryClient.ensureQueryData(sessionMeQueryOptions());

		if (me) {
			throw redirect({ to: normalizeRedirect(search.redirect) ?? "/" });
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
