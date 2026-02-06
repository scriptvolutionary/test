import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function Card({
	className,
	size = 'default',
	test,
	...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm'; test?: string }) {
	return (
		<div
			data-slot='card'
			data-size={size}
			data-test={test}
			className={cn(
				'group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-card-foreground text-sm ring-1 ring-foreground/10 has-[>img:first-child]:pt-0 has-data-[slot=card-footer]:pb-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
				className
			)}
			{...props}
		/>
	)
}

function CardHeader({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='card-header'
			data-test={test}
			className={cn(
				'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3',
				className
			)}
			{...props}
		/>
	)
}

function CardTitle({ className, test, ...props }: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='card-title'
			data-test={test}
			className={cn(
				'font-medium text-base leading-snug group-data-[size=sm]/card:text-sm',
				className
			)}
			{...props}
		/>
	)
}

function CardDescription({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='card-description'
			data-test={test}
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
}

function CardAction({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='card-action'
			data-test={test}
			className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
			{...props}
		/>
	)
}

function CardContent({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='card-content'
			data-test={test}
			className={cn('px-4 group-data-[size=sm]/card:px-3', className)}
			{...props}
		/>
	)
}

function CardFooter({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='card-footer'
			data-test={test}
			className={cn(
				'flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3',
				className
			)}
			{...props}
		/>
	)
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
