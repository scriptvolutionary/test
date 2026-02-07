import { useQuery } from '@tanstack/react-query'
import { Link, useSearch } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@/shared/ui/primitives/button'

import { columns as userColumns, usersListQueryOptions } from '@/platform/entities/user'
import { EntityList } from '@/platform/widgets/entity-list'

export function UsersListPageComponent() {
	const search = useSearch({ from: '/platform/users/' })

	const page = Number(search.page)
	const perPage = Number(search.per_page)

	const queryParams = React.useMemo(
		() => ({
			...search,
			page,
			per_page: perPage
		}),
		[search, page, perPage]
	)

	const query = useQuery(usersListQueryOptions(queryParams))

	const items = query.data?.data ?? []
	const meta = query.data?.metadata?.pagination

	const pageCount = meta?.last_page ?? 0

	const columns = React.useMemo(() => userColumns, [])

	return (
		<EntityList
			title='Пользователи'
			description='Управление доступом, ролями и статусами пользователей платформы.'
			action={
				<Button
					nativeButton={false}
					render={
						<Link to='/platform/users/new'>
							<PlusIcon />
							Добавить
						</Link>
					}
				/>
			}
			data={items}
			columns={columns}
			isLoading={query.isFetching}
			emptyText='Пользователи не найдены'
			getRowId={(row) => String(row.id)}
			page={page}
			perPage={perPage}
			pageCount={pageCount}
		/>
	)
}
