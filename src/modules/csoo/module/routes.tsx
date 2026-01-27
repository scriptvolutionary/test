import { createRoute } from '@tanstack/react-router'

import { protectedRoute } from '@/platform/app/routes'

const csooRootRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: '/csoo',
	component: () => <div>CSOO</div>
})

export const csooRouteTree = csooRootRoute
