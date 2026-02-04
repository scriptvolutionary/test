import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	createRoute,
	HeadContent,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import z from "zod";

import { defineHead } from "@/shared/lib/seo";

import { LoginPageComponent } from "@/platform/pages/auth/login";
import { ForbiddenPageComponent } from "@/platform/pages/errors/forbidden";

import { Devtools } from "../devtools";
import { PendingIndicator } from "../ui/pending-indicator";
import { redirectIfAuthed } from "./guards/session";

export const rootRoute = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: () => (
		<>
			<HeadContent />

			<Outlet />
			<PendingIndicator />

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
	head: defineHead({ title: "Получите доступ" }),
	beforeLoad: redirectIfAuthed,
	component: LoginPageComponent,
});

export const forbiddenRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "forbidden",
	head: defineHead({ title: "Нет доступа" }),
	validateSearch: z.object({
		from: z.string().optional(),
	}),
	component: ForbiddenPageComponent,
});
