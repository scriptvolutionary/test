import { createRoute, Outlet } from "@tanstack/react-router";

import { rootRoute } from ".";
import { requireModule } from "./guards/module";
import { requireAuth, requirePermission } from "./guards/session";

/* =========================================
 * PLATFORM ROOT
 * ========================================= */

export const platformRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "platform",
	beforeLoad: requireAuth,
	component: Outlet,
});

export const platformIndexRoute = createRoute({
	getParentRoute: () => platformRoute,
	path: "/",
	component: () => <>platform route</>,
});

/* =========================================
 * USERS
 * /platform/users           (GET)
 * /platform/users/new       (POST)
 * /platform/users/$userId   (GET)
 * /platform/users/$userId/edit (PUT)
 * ========================================= */

export const platformUsersRoute = createRoute({
	getParentRoute: () => platformRoute,
	path: "users",
	component: Outlet,
});

export const platformUsersIndexRoute = createRoute({
	getParentRoute: () => platformUsersRoute,
	path: "/",
	beforeLoad: requirePermission({ route: "users", method: "GET" }),
	component: () => <>users list page</>,
});

export const platformUserCreateRoute = createRoute({
	getParentRoute: () => platformUsersRoute,
	path: "new",
	beforeLoad: requirePermission({ route: "users", method: "POST" }),
	component: () => <>user create form page</>,
});

export const platformUserDetailsRoute = createRoute({
	getParentRoute: () => platformUsersRoute,
	path: "$userId",
	beforeLoad: requirePermission({ route: "users", method: "GET" }),
	component: () => <>user details page</>,
});

export const platformUserEditRoute = createRoute({
	getParentRoute: () => platformUserDetailsRoute,
	path: "edit",
	beforeLoad: requirePermission({ route: "users", method: "PUT" }),
	component: () => <>user edit form page</>,
});

/* =========================================
 * ROLES
 * /platform/roles           (GET)
 * /platform/roles/new       (POST)
 * /platform/roles/$roleId   (GET)
 * /platform/roles/$roleId/edit (PUT)
 * ========================================= */

export const platformRolesRoute = createRoute({
	getParentRoute: () => platformRoute,
	path: "roles",
	component: Outlet,
});

export const platformRolesIndexRoute = createRoute({
	getParentRoute: () => platformRolesRoute,
	path: "/",
	beforeLoad: requirePermission({ route: "roles", method: "GET" }),
	component: () => <>roles list page</>,
});

export const platformRoleCreateRoute = createRoute({
	getParentRoute: () => platformRolesRoute,
	path: "new",
	beforeLoad: requirePermission({ route: "roles", method: "POST" }),
	component: () => <>role create form page</>,
});

export const platformRoleDetailsRoute = createRoute({
	getParentRoute: () => platformRolesRoute,
	path: "$roleId",
	beforeLoad: requirePermission({ route: "roles", method: "GET" }),
	component: () => <>role details page</>,
});

export const platformRoleEditRoute = createRoute({
	getParentRoute: () => platformRoleDetailsRoute,
	path: "edit",
	beforeLoad: requirePermission({ route: "roles", method: "PUT" }),
	component: () => <>role edit form page</>,
});

/* =========================================
 * MODULE ROUTES
 * /platform/m/*
 * ========================================= */

export const moduleRoute = createRoute({
	getParentRoute: () => platformRoute,
	path: "m",
	beforeLoad: requireModule,
	component: Outlet,
});
