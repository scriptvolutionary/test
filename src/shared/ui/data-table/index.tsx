/** biome-ignore-all lint/suspicious/noExplicitAny: ignore */

import type {
	ColumnDef,
	ExpandedState,
	Row,
	SortingState,
	VisibilityState
} from '@tanstack/react-table'
import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { Spinner } from '@/shared/ui/primitives/spinner'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/shared/ui/primitives/table'

export type DataTableProps<TData> = {
	data: TData[]
	columns: ColumnDef<TData, any>[]
	isLoading?: boolean
	emptyText?: string
	showEmptyState?: boolean
	stickyHeader?: boolean
	getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string
	className?: string
	tableContainerClassName?: string
	getSubRows?: (originalRow: TData, index: number, parent?: Row<TData>) => TData[] | undefined
	renderExpandedContent?: (row: TData) => React.ReactNode
	canRowExpand?: (row: TData) => boolean
}

export function DataTable<TData>({
	data,
	columns,
	isLoading,
	emptyText = 'Нет данных',
	stickyHeader = true,
	getRowId,
	className,
	tableContainerClassName,
	canRowExpand,
	renderExpandedContent,
	getSubRows
}: DataTableProps<TData>) {
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [expanded, setExpanded] = React.useState<ExpandedState>({})

	const enableExpanding =
		typeof getSubRows === 'function' || typeof renderExpandedContent === 'function'

	const table = useReactTable({
		data,
		columns,

		manualSorting: false,
		enableMultiSort: true,
		isMultiSortEvent: (event) => {
			const e = event as MouseEvent | undefined
			return !!e && (e.shiftKey || e.ctrlKey || e.metaKey)
		},
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,

		getCoreRowModel: getCoreRowModel(),

		getRowId: getRowId
			? (originalRow, index, parent) => getRowId(originalRow, index, parent)
			: undefined,

		onColumnVisibilityChange: setColumnVisibility,

		...(enableExpanding
			? {
					getExpandedRowModel: getExpandedRowModel(),
					onExpandedChange: setExpanded,

					getSubRows: getSubRows
						? (originalRow: TData, index: number, parent?: Row<TData>) =>
								getSubRows(originalRow, index, parent)
						: undefined,

					getRowCanExpand: (row: Row<TData>) => (canRowExpand ? canRowExpand(row.original) : true)
				}
			: {}),

		state: {
			sorting,
			columnVisibility,
			...(enableExpanding ? { expanded } : {})
		},

		autoResetAll: false,
		autoResetPageIndex: false
	})

	const rows = table.getRowModel().rows
	const colCount = table.getAllLeafColumns().length

	return (
		<Table containerClassName={cn(tableContainerClassName, 'pr-1')} className={cn(className)}>
			<TableHeader className={cn(stickyHeader && 'sticky top-0 z-30')}>
				{table.getHeaderGroups().map((hg) => (
					<TableRow className='border-none bg-card hover:bg-card' key={hg.id}>
						{hg.headers.map((header) => {
							const canSort = header.column.getCanSort()
							const sortDir = header.column.getIsSorted()

							const headClassName = (header.column.columnDef.meta as any)?.className

							return (
								<TableHead
									key={header.id}
									onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
									className={cn(
										canSort && 'cursor-pointer select-none',
										'whitespace-nowrap hover:bg-muted/50',
										headClassName
									)}
								>
									<div className='flex items-center gap-2'>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}

										{canSort ? (
											<span className='text-muted-foreground'>
												{sortDir === 'asc' ? '▲' : sortDir === 'desc' ? '▼' : '↕'}
											</span>
										) : null}
									</div>
								</TableHead>
							)
						})}
					</TableRow>
				))}
			</TableHeader>

			<TableBody>
				{isLoading ? (
					<TableRow>
						<TableCell colSpan={colCount} className='h-24'>
							<div className='flex items-center justify-center'>
								<Spinner />
							</div>
						</TableCell>
					</TableRow>
				) : rows.length === 0 ? (
					<TableRow>
						<TableCell colSpan={colCount} className='h-24 text-center text-muted-foreground'>
							{emptyText}
						</TableCell>
					</TableRow>
				) : (
					rows.map((row) => (
						<React.Fragment key={row.id}>
							<TableRow>
								{row.getVisibleCells().map((cell) => {
									const cellClassName = (cell.column.columnDef.meta as any)?.className

									return (
										<TableCell key={cell.id} className={cn(cellClassName)}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									)
								})}
							</TableRow>

							{renderExpandedContent && row.getIsExpanded() ? (
								<TableRow>
									<TableCell colSpan={colCount} className='p-0'>
										<div className='p-4'>{renderExpandedContent(row.original)}</div>
									</TableCell>
								</TableRow>
							) : null}
						</React.Fragment>
					))
				)}
			</TableBody>
		</Table>
	)
}
