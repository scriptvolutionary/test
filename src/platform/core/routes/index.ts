import { forbiddenRoute, loginRoute } from "./public";

export { protectedRoute } from "./protected";
export { rootRoute } from "./root";

export const platformPublicRouteTree = [forbiddenRoute, loginRoute] as const;
