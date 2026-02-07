import { createRoute, Outlet, redirect } from '@tanstack/react-router'
import z from 'zod'

import { defineHead, defineHeadFn } from '@/shared/lib/seo'

import { UsersListPageComponent } from '@/platform/pages/users/list'
import { PlatformShell } from '@/platform/widgets/platform-shell'

import { rootRoute } from '.'
import { requireModule } from './guards/module'
import { requireAuth, requirePermission } from './guards/session'

/* =========================================
 * PLATFORM ROOT
 * ========================================= */

export const platformRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: 'platform',
	beforeLoad: requireAuth,
	staticData: { crumb: 'Платформа' },
	head: defineHead({ title: 'Платформа' }),
	component: PlatformShell
})

export const platformIndexRoute = createRoute({
	getParentRoute: () => platformRoute,
	path: '/',
	staticData: { crumb: 'Главная' },
	head: defineHead({ title: 'Платформа · Главная' }),
	component: () => <>platform route</>
})

/* =========================================
 * USERS
 * /platform/users           (GET)
 * /platform/users/new       (POST)
 * /platform/users/$userId   (GET)
 * /platform/users/$userId/edit (PUT)
 * ========================================= */

export const platformUsersRoute = createRoute({
	getParentRoute: () => platformRoute,
	path: 'users',
	staticData: { crumb: 'Пользователи' },
	head: defineHead({ title: 'Пользователи' }),
	component: Outlet
})

export const platformUsersIndexRoute = createRoute({
	getParentRoute: () => platformUsersRoute,
	path: '/',
	validateSearch: z.object({
		search: z.string().optional(),
		page: z.coerce.number().int().min(1).optional(),
		per_page: z.coerce.number().int().min(1).optional()
	}),
	beforeLoad: async (ctx) => {
		await requirePermission({ route: 'users', method: 'GET' })(ctx)

		const nextPage = ctx.search.page ?? 1
		const nextPerPage = ctx.search.per_page ?? 30
		const needsDefaults = ctx.search.page == null || ctx.search.per_page == null

		if (needsDefaults) {
			throw redirect({
				to: '.',
				search: {
					...ctx.search,
					page: nextPage,
					per_page: nextPerPage
				}
			})
		}
	},
	staticData: { crumb: 'Список' },
	head: defineHead({ title: 'Пользователи · Список' }),
	component: UsersListPageComponent
})

export const platformUserCreateRoute = createRoute({
	getParentRoute: () => platformUsersRoute,
	path: 'new',
	beforeLoad: requirePermission({ route: 'users', method: 'POST' }),
	staticData: { crumb: 'Новый' },
	head: defineHead({ title: 'Пользователи · Новый' }),
	component: () => <>user create form page</>
})

export const platformUserDetailsRoute = createRoute({
	getParentRoute: () => platformUsersRoute,
	path: '$userId',
	beforeLoad: requirePermission({ route: 'users', method: 'GET' }),
	staticData: { crumb: ({ params }) => `${params.userId}` },
	head: defineHeadFn(({ params }) => ({
		title: `Пользователи · #${params.userId}`,
		description: `Профиль пользователя #${params.userId}`,
		meta: [
			{
				property: 'og:title',
				content: `Пользователи · #${params.userId}`
			},
			{
				property: 'og:description',
				content: `Профиль пользователя #${params.userId}`
			}
		]
	})),
	component: () => <>user details page</>
})

export const platformUserEditRoute = createRoute({
	getParentRoute: () => platformUserDetailsRoute,
	path: 'edit',
	beforeLoad: requirePermission({ route: 'users', method: 'PUT' }),
	staticData: { crumb: 'Редактирование' },
	head: defineHeadFn(({ params }) => ({
		title: `Пользователи · #${params.userId} · Редактирование`,
		description: `Редактирование пользователя #${params.userId}`,
		meta: [
			{
				property: 'og:title',
				content: `Пользователи · #${params.userId} · Редактирование`
			},
			{
				property: 'og:description',
				content: `Профиль пользователя #${params.userId} · Редактирование`
			}
		]
	})),
	component: () => <>user edit form page</>
})

/* =========================================
 * ROLES
 * /platform/roles           (GET)
 * /platform/roles/new       (POST)
 * /platform/roles/$roleId   (GET)
 * /platform/roles/$roleId/edit (PUT)
 * ========================================= */

export const platformRolesRoute = createRoute({
	getParentRoute: () => platformRoute,
	path: 'roles',
	staticData: { crumb: 'Роли' },
	head: defineHead({ title: 'Роли' }),
	component: Outlet
})

export const platformRolesIndexRoute = createRoute({
	getParentRoute: () => platformRolesRoute,
	path: '/',
	beforeLoad: requirePermission({ route: 'roles', method: 'GET' }),
	staticData: { crumb: 'Список' },
	head: defineHead({ title: 'Роли · Список' }),
	component: () => <>roles list page</>
})

export const platformRoleCreateRoute = createRoute({
	getParentRoute: () => platformRolesRoute,
	path: 'new',
	beforeLoad: requirePermission({ route: 'roles', method: 'POST' }),
	staticData: { crumb: 'Новая' },
	head: defineHead({ title: 'Роли · Новая' }),
	component: () => <>role create form page</>
})

export const platformRoleDetailsRoute = createRoute({
	getParentRoute: () => platformRolesRoute,
	path: '$roleId',
	beforeLoad: requirePermission({ route: 'roles', method: 'GET' }),
	staticData: { crumb: ({ params }) => `${params.roleId}` },
	head: defineHeadFn(({ params }) => ({
		title: `Роли · #${params.roleId}`,
		description: `Карточка роли #${params.roleId}`,
		meta: [
			{ property: 'og:title', content: `Роли · #${params.roleId}` },
			{
				property: 'og:description',
				content: `Карточка роли #${params.roleId}`
			}
		]
	})),
	component: () => <>role details page</>
})

export const platformRoleEditRoute = createRoute({
	getParentRoute: () => platformRoleDetailsRoute,
	path: 'edit',
	beforeLoad: requirePermission({ route: 'roles', method: 'PUT' }),
	staticData: { crumb: 'Редактирование' },
	head: defineHeadFn(({ params }) => ({
		title: `Роли · #${params.roleId} · Редактирование`,
		description: `Редактирование роли #${params.roleId}`,
		meta: [
			{
				property: 'og:title',
				content: `Роли · #${params.roleId}· Редактирование`
			},
			{
				property: 'og:description',
				content: `Редактирование роли #${params.roleId}`
			}
		]
	})),
	component: () => <>role edit form page</>
})

/* =========================================
 * MODULE ROUTES
 * /platform/m/*
 * ========================================= */

export const moduleRoute = createRoute({
	getParentRoute: () => platformRoute,
	path: 'm',
	beforeLoad: requireModule,
	staticData: { crumb: 'Модуль' },
	component: Outlet
})
