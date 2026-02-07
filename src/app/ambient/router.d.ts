import '@tanstack/react-router'

import { router } from '@/app/router'

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}

	interface StaticDataRouteOption {
		crumb?: string | ((match: { params: Record<string, string | number | undefined> }) => string)
	}
}
