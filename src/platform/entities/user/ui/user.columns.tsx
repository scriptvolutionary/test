/** biome-ignore-all lint/suspicious/noExplicitAny: ignore */

import type { ColumnDef } from '@tanstack/react-table'

import type { User } from '../model/user.types'

export const columns: ColumnDef<User, any>[] = [
	{
		accessorKey: 'id',
		header: 'ID'
	},
	{
		accessorKey: 'email',
		header: 'Email'
	}
]
