import { notFound, redirect } from '@tanstack/react-router'

import { useSessionStore } from '@/platform/core/state'
import { enabledModuleKeys, type Module } from '@/platform/infra/config'

type GuardArgs = { location: { pathname: string } }

function getModuleFromLocation(pathname: string): string | null {
	const parts = pathname.split('/').filter(Boolean)
	return parts[2] ?? null
}

export async function requireModule({ location }: GuardArgs) {
	const raw = getModuleFromLocation(location.pathname)

	if (!raw) {
		const next = useSessionStore.getState().module
		throw redirect({ to: `/platform/m/${next}` })
	}

	const key = raw as Module

	if (!enabledModuleKeys.includes(key)) {
		throw notFound()
	}

	const current = useSessionStore.getState().module
	if (current !== key) {
		useSessionStore.getState().setModule(key)
	}
}
