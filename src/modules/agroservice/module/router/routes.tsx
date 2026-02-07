import { createRoute, Outlet } from '@tanstack/react-router'

import { defineHead } from '@/shared/lib/seo'

import { moduleRoute } from '@/platform/sdk/routes'

export const rootRoute = createRoute({
	getParentRoute: () => moduleRoute,
	path: 'agroservice',
	head: defineHead({ title: 'Агросервис' }),
	component: Outlet
})

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	staticData: { crumb: 'Главная' },
	head: defineHead({ title: 'Агросервис · Главная' }),
	component: () => <div>AGRO</div>
})
