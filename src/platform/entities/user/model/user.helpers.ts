import type { User } from './user.types'

export function formatUserName(user: Partial<User> | null | undefined) {
	if (!user) return null

	const parts = [user.lastname, user.firstname, user.patronymic].filter(Boolean)
	if (!parts.length) return user.email ?? null

	return parts.join(' ')
}

export function getUserInitials(user: Partial<User> | null | undefined) {
	if (!user) return '?'

	const first = user.firstname?.[0] ?? user.email?.[0] ?? '?'
	const last = user.lastname?.[0] ?? ''

	return `${first}${last}`.trim().toUpperCase()
}
