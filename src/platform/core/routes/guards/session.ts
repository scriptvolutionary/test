import type { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import { sessionKeys, sessionMeQueryOptions } from '@/platform/entities/session'
import type { SessionUser } from '@/platform/entities/user'
import { getAuthToken } from '@/platform/infra/auth-token'

type GuardContext = { queryClient: QueryClient }
type GuardLocation = { href: string }
type PermissionMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type RequirePermissionOptions = {
	route?: string
	method?: PermissionMethod | PermissionMethod[]
	sysname?: string
}

/* =========================================
 * AUTH
 * ========================================= */

async function getSession(queryClient: QueryClient): Promise<SessionUser | null> {
	const token = getAuthToken()
	if (!token) return null

	const cached = queryClient.getQueryData<SessionUser | null>(sessionKeys.me())
	if (cached !== undefined) return cached

	return queryClient.ensureQueryData(sessionMeQueryOptions())
}

async function ensureSession(context: GuardContext, location: GuardLocation): Promise<SessionUser> {
	const session = await getSession(context.queryClient)

	if (!session) {
		throw redirect({ to: '/log-in', search: { redirect: location.href } })
	}

	return session
}

export async function requireAuth({
	context,
	location
}: {
	context: GuardContext
	location: GuardLocation
}) {
	await ensureSession(context, location)
}

export async function redirectIfAuthed({
	context,
	search
}: {
	context: GuardContext
	search: { redirect?: string }
}) {
	const session = await getSession(context.queryClient)

	if (session) {
		throw redirect({ to: search.redirect ?? '/platform' })
	}
}

/* =========================================
 * ROLE
 * ========================================= */

function toArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value]
}

export function requireRole(roles: string | string[]) {
	const required = toArray(roles)

	return async ({ context, location }: { context: GuardContext; location: GuardLocation }) => {
		const session = await ensureSession(context, location)

		if (!required.includes(session.role.sysname)) {
			throw redirect({
				to: '/forbidden',
				search: { from: location.href }
			})
		}
	}
}

/* =========================================
 * PERMISSION
 * ========================================= */

function splitMethods(methods: string): string[] {
	return methods
		.split(':')
		.map((method) => method.trim().toUpperCase())
		.filter(Boolean)
}

function hasRequiredMethods(
	permissionMethods: string,
	required: PermissionMethod | PermissionMethod[]
): boolean {
	const allowed = new Set(splitMethods(permissionMethods))
	return toArray(required).some((method) => allowed.has(method.toUpperCase()))
}

function hasPermission(
	permissions: SessionUser['permissions'],
	options: RequirePermissionOptions
): boolean {
	if (!options.route && !options.sysname) return false

	return permissions.some((permission) => {
		if (options.sysname && permission.sysname !== options.sysname) return false
		if (options.route && permission.route !== options.route) return false
		if (options.method && !hasRequiredMethods(permission.methods, options.method)) return false
		return true
	})
}

export function requirePermission(options: RequirePermissionOptions) {
	return async ({ context, location }: { context: GuardContext; location: GuardLocation }) => {
		const session = await ensureSession(context, location)

		if (!hasPermission(session.permissions, options)) {
			throw redirect({
				to: '/forbidden',
				search: { from: location.href }
			})
		}
	}
}
