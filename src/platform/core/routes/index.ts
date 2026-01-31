import { forbiddenRoute, indexRoute, loginRoute } from "./public";

export * from "./protected";
export { rootRoute } from "./public";

export const platformPublicRouteTree = [
	indexRoute,
	forbiddenRoute,
	loginRoute,
] as const;
