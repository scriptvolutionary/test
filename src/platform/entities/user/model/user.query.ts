import { queryOptions } from '@tanstack/react-query'

import { createListQueryOptions } from '@/platform/infra/query/create-list-query'

import type { UsersListParams } from '../api/user.api'
import { fetchUserById, fetchUsers } from '../api/user.api'
import { userKeys } from './user.keys'

export const usersListQueryOptions = createListQueryOptions({
	getKey: (p) => userKeys.list(p),
	queryFn: (params: UsersListParams) => fetchUsers(params)
})

export const usersSelectQueryOptions = createListQueryOptions({
	getKey: (p) => userKeys.list(p),
	queryFn: (params: UsersListParams) => fetchUsers(params)
})

export function userDetailQueryOptions(id: number) {
	return queryOptions({
		queryKey: userKeys.detail(id),
		queryFn: () => fetchUserById(id),
		staleTime: 60 * 60_000
	})
}
