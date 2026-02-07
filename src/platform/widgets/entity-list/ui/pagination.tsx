/** biome-ignore-all lint/suspicious/noExplicitAny: <ignore> */

import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon
} from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/primitives/button'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink
} from '@/shared/ui/primitives/pagination'

type Props = {
	page: number
	perPage: number
	pageCount: number
	isLoading?: boolean
	className?: string
	pageSizeOptions?: number[]
}

const DEFAULT_PAGE_SIZES = [10, 20, 30, 50, 100] as const

function clampPage(value: number, pageCount: number) {
	if (pageCount <= 0) return 1
	return Math.min(Math.max(1, value), pageCount)
}

function buildPageItems(currentPage: number, pageCount: number) {
	if (pageCount <= 1) return []
	if (pageCount <= 7) {
		return Array.from({ length: pageCount }, (_, i) => i + 1)
	}
	if (currentPage <= 4) {
		return [1, 2, 3, 4, 5, 'ellipsis', pageCount] as const
	}
	if (currentPage >= pageCount - 3) {
		return [
			1,
			'ellipsis',
			pageCount - 4,
			pageCount - 3,
			pageCount - 2,
			pageCount - 1,
			pageCount
		] as const
	}
	return [
		1,
		'ellipsis',
		currentPage - 1,
		currentPage,
		currentPage + 1,
		'ellipsis',
		pageCount
	] as const
}

function buildSearch(nextPage: number, perPage: number) {
	return (prev: any) => ({
		...prev,
		page: nextPage,
		per_page: perPage
	})
}

function buildPageSizeSearch(nextPerPage: number) {
	return (prev: any) => ({
		...prev,
		page: 1,
		per_page: nextPerPage
	})
}

type PageLinkProps = React.ComponentProps<typeof PaginationLink> & {
	disabled?: boolean
}

function PageLink({ disabled, className, onClick, ...props }: PageLinkProps) {
	return (
		<PaginationLink
			{...props}
			onClick={(event) => {
				if (disabled) {
					event.preventDefault()
					return
				}
				onClick?.(event)
			}}
			aria-disabled={disabled ? 'true' : undefined}
			tabIndex={disabled ? -1 : undefined}
			className={cn(disabled && 'pointer-events-none opacity-50', className)}
		/>
	)
}

export function EntityListPagination({
	page,
	perPage,
	pageCount,
	isLoading,
	className,
	pageSizeOptions = [...DEFAULT_PAGE_SIZES]
}: Props) {
	const currentPage = pageCount === 0 ? 0 : clampPage(page, pageCount)
	const canPrev = currentPage > 1
	const canNext = pageCount > 0 && currentPage < pageCount

	const pageItems = React.useMemo(
		() => buildPageItems(currentPage, pageCount),
		[currentPage, pageCount]
	)

	const pageSizeIndex = React.useMemo(
		() => Math.max(0, pageSizeOptions.indexOf(perPage)),
		[pageSizeOptions, perPage]
	)
	const prevPageSize = pageSizeOptions[Math.max(0, pageSizeIndex - 1)]
	const nextPageSize = pageSizeOptions[Math.min(pageSizeOptions.length - 1, pageSizeIndex + 1)]
	const canDecPageSize = prevPageSize !== perPage
	const canIncPageSize = nextPageSize !== perPage

	return (
		<div className={cn('flex w-full flex-wrap items-center justify-between gap-3', className)}>
			<Button className='pointer-events-none' variant='ghost'>
				{pageCount === 0 ? 0 : currentPage} <span className='text-muted-foreground'>из</span>{' '}
				{pageCount}
			</Button>

			<Pagination className='mx-0 w-auto justify-start'>
				<PaginationContent className='gap-1'>
					<PaginationItem>
						<PageLink
							to='.'
							// @ts-ignore
							search={buildSearch(1, perPage)}
							size='icon-sm'
							className='h-8 w-8'
							disabled={isLoading || !canPrev}
							aria-label='В начало'
						>
							<ChevronsLeftIcon />
						</PageLink>
					</PaginationItem>
					<PaginationItem>
						<PageLink
							to='.'
							// @ts-ignore
							search={buildSearch(currentPage - 1, perPage)}
							size='icon-sm'
							className='h-8 w-8'
							disabled={isLoading || !canPrev}
							aria-label='Назад'
						>
							<ChevronLeftIcon />
						</PageLink>
					</PaginationItem>
					{pageItems.map((item, index) => (
						<PaginationItem key={`${item}-${index}`}>
							{item === 'ellipsis' ? (
								<PaginationEllipsis />
							) : (
								<PageLink
									to='.'
									// @ts-ignore
									search={buildSearch(item, perPage)}
									size='icon-sm'
									className='min-w-8'
									isActive={item === currentPage}
									disabled={isLoading}
									aria-current={item === currentPage ? 'page' : undefined}
								>
									{item}
								</PageLink>
							)}
						</PaginationItem>
					))}
					<PaginationItem>
						<PageLink
							to='.'
							// @ts-ignore
							search={buildSearch(currentPage + 1, perPage)}
							size='icon-sm'
							className='h-8 w-8'
							disabled={isLoading || !canNext}
							aria-label='Вперёд'
						>
							<ChevronRightIcon />
						</PageLink>
					</PaginationItem>
					<PaginationItem>
						<PageLink
							to='.'
							// @ts-ignore
							search={buildSearch(pageCount, perPage)}
							size='icon-sm'
							className='h-8 w-8'
							disabled={isLoading || !canNext}
							aria-label='В конец'
						>
							<ChevronsRightIcon />
						</PageLink>
					</PaginationItem>
				</PaginationContent>
			</Pagination>

			<div className='flex items-center gap-1 text-muted-foreground text-xs'>
				<div className='inline-flex items-center rounded-md border bg-background/25 p-0.5'>
					<PageLink
						to='.'
						// @ts-ignore
						search={buildPageSizeSearch(prevPageSize)}
						size='icon-sm'
						disabled={isLoading || !canDecPageSize}
						aria-label='Уменьшить количество строк'
					>
						<ChevronLeftIcon />
					</PageLink>
					<span className='text-center text-foreground text-sm'>{perPage}</span>
					<PageLink
						to='.'
						// @ts-ignore
						search={buildPageSizeSearch(nextPageSize)}
						size='icon-sm'
						disabled={isLoading || !canIncPageSize}
						aria-label='Увеличить количество строк'
					>
						<ChevronRightIcon />
					</PageLink>
				</div>
			</div>
		</div>
	)
}
