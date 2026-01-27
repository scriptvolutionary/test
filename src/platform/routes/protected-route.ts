import { createRoute, Outlet, redirect } from '@tanstack/react-router'

import { useAuthStore } from '../auth/store'
import { rootRoute } from './root-route'

export const protectedRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	beforeLoad: async ({ location }) => {
		const { user } = useAuthStore.getState()

		if (user === null) {
			return redirect({
				to: '/login',
				search: { redirect: location.pathname }
			})
		}
	},
	component: Outlet
})
