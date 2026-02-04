import {
	platformIndexRoute,
	platformRoleCreateRoute,
	platformRoleDetailsRoute,
	platformRoleEditRoute,
	platformRolesIndexRoute,
	platformRolesRoute,
	platformUserCreateRoute,
	platformUserDetailsRoute,
	platformUserEditRoute,
	platformUsersIndexRoute,
	platformUsersRoute,
} from "./protected";
import { forbiddenRoute, indexRoute, loginRoute } from "./public";

export * from "./protected";
export { rootRoute } from "./public";

export const publicRouteTree = [
	indexRoute,
	forbiddenRoute,
	loginRoute,
] as const;

export const platformRouteTree = [
	platformIndexRoute,

	platformUsersRoute.addChildren([
		platformUsersIndexRoute,
		platformUserCreateRoute,
		platformUserDetailsRoute.addChildren([platformUserEditRoute]),
	]),

	platformRolesRoute.addChildren([
		platformRolesIndexRoute,
		platformRoleCreateRoute,
		platformRoleDetailsRoute.addChildren([platformRoleEditRoute]),
	]),
];
