import { useMemo } from 'react'

import {
	canPermission,
	canRole,
	type PermissionCheck,
	useSessionMe
} from '@/platform/entities/session'

export function useCanRole(roles: string | string[]) {
	const { data, isLoading } = useSessionMe()

	const allowed = useMemo(() => canRole(data, roles), [data, roles])

	return { allowed, isLoading }
}

export function useCanPermission(check: PermissionCheck) {
	const { data, isLoading } = useSessionMe()

	const allowed = useMemo(() => canPermission(data, check), [data, check])

	return { allowed, isLoading }
}
