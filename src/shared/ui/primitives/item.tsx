import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { Separator } from '@/shared/ui/primitives/separator'

function ItemGroup({ className, test, ...props }: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			role='list'
			data-slot='item-group'
			data-test={test}
			className={cn(
				'group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2',
				className
			)}
			{...props}
		/>
	)
}

function ItemSeparator({ className, test, ...props }: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot='item-separator'
			test={test}
			orientation='horizontal'
			className={cn('my-2', className)}
			{...props}
		/>
	)
}

const itemVariants = cva(
	'group/item flex w-full flex-wrap items-center rounded-lg border text-sm outline-none transition-colors duration-200 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted',
	{
		variants: {
			variant: {
				default: 'border-transparent',
				outline: 'border-border',
				muted: 'border-transparent bg-muted/50'
			},
			size: {
				default: 'gap-2.5 px-3 py-2.5',
				sm: 'gap-2.5 px-3 py-2.5',
				xs: 'gap-2 px-2.5 py-2 [[data-slot=dropdown-menu-content]_&]:p-0'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

function Item({
	className,
	variant = 'default',
	size = 'default',
	render,
	test,
	...props
}: useRender.ComponentProps<'div'> & VariantProps<typeof itemVariants> & { test?: string }) {
	return useRender({
		defaultTagName: 'div',
		props: mergeProps<'div'>({ className: cn(itemVariants({ variant, size, className })) }, props),
		render,
		state: { slot: 'item', variant, size, test }
	})
}

const itemMediaVariants = cva(
	'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none',
	{
		variants: {
			variant: {
				default: 'bg-transparent',
				icon: "[&_svg:not([class*='size-'])]:size-4",
				image:
					'size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

function ItemMedia({
	className,
	test,
	variant = 'default',
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof itemMediaVariants> & { test?: string }) {
	return (
		<div
			data-slot='item-media'
			data-test={test}
			data-variant={variant}
			className={cn(itemMediaVariants({ variant, className }))}
			{...props}
		/>
	)
}

function ItemContent({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='item-content'
			data-test={test}
			className={cn(
				'flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none',
				className
			)}
			{...props}
		/>
	)
}

function ItemTitle({ className, test, ...props }: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='item-title'
			data-test={test}
			className={cn(
				'line-clamp-1 flex w-fit items-center gap-2 font-medium text-sm leading-snug underline-offset-4',
				className
			)}
			{...props}
		/>
	)
}

function ItemDescription({
	className,
	test,
	...props
}: React.ComponentProps<'p'> & { test?: string }) {
	return (
		<p
			data-slot='item-description'
			data-test={test}
			className={cn(
				'line-clamp-2 text-left font-normal text-muted-foreground text-sm leading-normal group-data-[size=xs]/item:text-xs [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
				className
			)}
			{...props}
		/>
	)
}

function ItemActions({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='item-actions'
			data-test={test}
			className={cn('flex items-center gap-2', className)}
			{...props}
		/>
	)
}

function ItemHeader({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='item-header'
			data-test={test}
			className={cn('flex basis-full items-center justify-between gap-2', className)}
			{...props}
		/>
	)
}

function ItemFooter({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='item-footer'
			data-test={test}
			className={cn('flex basis-full items-center justify-between gap-2', className)}
			{...props}
		/>
	)
}

export {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemMedia,
	ItemSeparator,
	ItemTitle
}
