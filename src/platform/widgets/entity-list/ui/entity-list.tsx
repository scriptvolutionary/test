/** biome-ignore-all lint/suspicious/noExplicitAny: <ignore> */
import type { ColumnDef, Row } from '@tanstack/react-table'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { DataTable } from '@/shared/ui/data-table'
import { Card, CardContent, CardFooter } from '@/shared/ui/primitives/card'

import { EntityListPagination } from './pagination'

type HeaderProps = {
	title?: React.ReactNode
	description?: React.ReactNode
	action?: React.ReactNode
}

type Props<TData> = HeaderProps & {
	data: TData[]
	columns: ColumnDef<TData, any>[]
	isLoading?: boolean
	emptyText?: string
	getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string
	className?: string

	page: number
	perPage: number
	pageCount: number
	pageSizeOptions?: number[]
}

export function EntityList<TData>({
	title,
	description,
	action,
	data,
	columns,
	isLoading,
	emptyText = 'Данных нет',
	getRowId,
	className,
	page,
	perPage,
	pageCount,
	pageSizeOptions
}: Props<TData>) {
	const hasHeader = Boolean(title || description || action)

	return (
		<div
			className={cn(
				'mx-auto flex h-full min-h-0 w-full max-w-350 flex-1 flex-col gap-4',
				className
			)}
		>
			{hasHeader ? (
				<div className='flex flex-wrap items-start justify-between gap-3'>
					<div className='space-y-1'>
						{title ? <h1 className='font-semibold text-lg'>{title}</h1> : null}
						{description ? <p className='text-muted-foreground text-sm'>{description}</p> : null}
					</div>
					{action ? <div className='flex flex-wrap items-center gap-2'>{action}</div> : null}
				</div>
			) : null}

			<Card className='flex h-full min-h-0 flex-1 bg-card/25 backdrop-blur-xs'>
				<CardContent className='flex min-h-0 flex-1 flex-col gap-0'>
					<div className='relative flex min-h-0 flex-1 flex-col'>
						<DataTable
							tableContainerClassName='minimal-scroll min-h-0 flex-1 overflow-auto'
							data={data}
							columns={columns}
							isLoading={isLoading}
							emptyText={emptyText}
							showEmptyState={false}
							getRowId={getRowId}
						/>
					</div>
				</CardContent>
				<CardFooter className='mt-auto shrink-0 bg-transparent'>
					<EntityListPagination
						page={page}
						perPage={perPage}
						pageCount={pageCount}
						isLoading={isLoading}
						pageSizeOptions={pageSizeOptions}
					/>
				</CardFooter>
			</Card>
		</div>
	)
}
