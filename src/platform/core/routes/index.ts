import { platformIndexRoute } from "./protected";
import { forbiddenRoute, indexRoute, loginRoute } from "./public";

export * from "./protected";
export { rootRoute } from "./public";

export const publicRouteTree = [
	indexRoute,
	forbiddenRoute,
	loginRoute,
] as const;

export const platformRouteTree = [platformIndexRoute];
