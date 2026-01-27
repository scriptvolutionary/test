import { createRouter } from '@tanstack/react-router'

import { isModuleEnabled } from '@/platform/config'
import { protectedRoute, rootRoute } from '@/platform/routes'
import type { Module } from '@/platform/state'

import { NotFoundPageComponent } from '@/app/pages/not-found'

import { agroRouteTree } from '@/modules/agro'
import { csooRouteTree } from '@/modules/csoo'

import { loginRoute } from './routes'

const enabledModules = [
	{ key: 'agro' as Module, route: agroRouteTree },
	{ key: 'csoo' as Module, route: csooRouteTree }
].filter(m => isModuleEnabled(m.key))

const routeTree = rootRoute.addChildren([
	loginRoute,
	protectedRoute.addChildren(enabledModules.map(m => m.route))
])

export const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	context: undefined!,
	defaultNotFoundComponent: NotFoundPageComponent
})
