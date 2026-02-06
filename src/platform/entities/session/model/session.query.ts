/** biome-ignore-all lint/suspicious/noExplicitAny: ignore */

import { queryOptions } from '@tanstack/react-query'

import type { SessionUser } from '@/platform/entities/user'

import { fetchSession } from '../api/session.api'
import { sessionKeys } from './session.keys'

export function sessionMeQueryOptions() {
	return queryOptions({
		queryKey: sessionKeys.me(),
		queryFn: async (): Promise<SessionUser | null> => {
			try {
				const res = await fetchSession()
				return res.data
			} catch (e: any) {
				const status = e?.response?.status
				if (status === 401 || status === 403) return null
				throw e
			}
		},
		staleTime: 60_000,
		gcTime: 10 * 60_000,
		retry: (count, error: any) => {
			const status = error?.response?.status
			if (status === 401 || status === 403) return false
			return count < 2
		}
	})
}
