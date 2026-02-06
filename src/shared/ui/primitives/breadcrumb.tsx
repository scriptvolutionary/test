import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function Breadcrumb({
	className,
	test,
	...props
}: React.ComponentProps<'nav'> & { test?: string }) {
	return (
		<nav
			aria-label='breadcrumb'
			data-slot='breadcrumb'
			data-test={test}
			className={cn(className)}
			{...props}
		/>
	)
}

function BreadcrumbList({
	className,
	test,
	...props
}: React.ComponentProps<'ol'> & { test?: string }) {
	return (
		<ol
			data-slot='breadcrumb-list'
			data-test={test}
			className={cn(
				'wrap-break-word flex flex-wrap items-center gap-1.5 text-muted-foreground text-sm',
				className
			)}
			{...props}
		/>
	)
}

function BreadcrumbItem({
	className,
	test,
	...props
}: React.ComponentProps<'li'> & { test?: string }) {
	return (
		<li
			data-slot='breadcrumb-item'
			data-test={test}
			className={cn('inline-flex items-center gap-1', className)}
			{...props}
		/>
	)
}

function BreadcrumbLink({
	className,
	render,
	test,
	...props
}: useRender.ComponentProps<'a'> & { test?: string }) {
	return useRender({
		defaultTagName: 'a',
		props: mergeProps<'a'>(
			{ className: cn('transition-colors hover:text-foreground', className) },
			props
		),
		render,
		state: { slot: 'breadcrumb-link', test }
	})
}

function BreadcrumbPage({
	className,
	test,
	...props
}: React.ComponentProps<'span'> & { test?: string }) {
	return (
		<span
			data-slot='breadcrumb-page'
			data-test={test}
			role='link'
			aria-disabled='true'
			aria-current='page'
			className={cn('font-normal text-foreground', className)}
			{...props}
		/>
	)
}

function BreadcrumbSeparator({
	children,
	className,
	test,
	...props
}: React.ComponentProps<'li'> & { test?: string }) {
	return (
		<li
			data-slot='breadcrumb-separator'
			data-test={test}
			role='presentation'
			aria-hidden='true'
			className={cn('[&>svg]:size-3.5', className)}
			{...props}
		>
			{children ?? <ChevronRightIcon />}
		</li>
	)
}

function BreadcrumbEllipsis({
	className,
	test,
	...props
}: React.ComponentProps<'span'> & { test?: string }) {
	return (
		<span
			data-slot='breadcrumb-ellipsis'
			data-test={test}
			role='presentation'
			aria-hidden='true'
			className={cn('flex size-5 items-center justify-center [&>svg]:size-4', className)}
			{...props}
		>
			<MoreHorizontalIcon />
			<span className='sr-only'>More</span>
		</span>
	)
}

export {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
}
