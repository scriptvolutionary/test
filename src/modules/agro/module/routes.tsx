import { createRoute } from '@tanstack/react-router'

import { protectedRoute } from '@/platform/app/routes'

const agroRootRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: '/agro',
	component: () => <div>AGRO</div>
})

export const agroRouteTree = agroRootRoute
