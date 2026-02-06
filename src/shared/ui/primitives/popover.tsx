import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function Popover({ test, ...props }: PopoverPrimitive.Root.Props & { test?: string }) {
	return <PopoverPrimitive.Root data-slot='popover' data-test={test} {...props} />
}

function PopoverTrigger({ test, ...props }: PopoverPrimitive.Trigger.Props & { test?: string }) {
	return <PopoverPrimitive.Trigger data-slot='popover-trigger' data-test={test} {...props} />
}

function PopoverContent({
	className,
	align = 'center',
	test,
	alignOffset = 0,
	side = 'bottom',
	sideOffset = 4,
	...props
}: PopoverPrimitive.Popup.Props &
	Pick<PopoverPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> & {
		test?: string
	}) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className='isolate z-50'
			>
				<PopoverPrimitive.Popup
					data-slot='popover-content'
					data-test={test}
					className={cn(
						'data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-popover-foreground text-sm shadow-md outline-hidden ring-1 ring-foreground/10 duration-200 data-closed:animate-out data-open:animate-in',
						className
					)}
					{...props}
				/>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	)
}

function PopoverHeader({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='popover-header'
			data-test={test}
			className={cn('flex flex-col gap-0.5 text-sm', className)}
			{...props}
		/>
	)
}

function PopoverTitle({
	className,
	test,
	...props
}: PopoverPrimitive.Title.Props & { test?: string }) {
	return (
		<PopoverPrimitive.Title
			data-slot='popover-title'
			data-test={test}
			className={cn('font-medium', className)}
			{...props}
		/>
	)
}

function PopoverDescription({
	className,
	test,
	...props
}: PopoverPrimitive.Description.Props & { test?: string }) {
	return (
		<PopoverPrimitive.Description
			data-slot='popover-description'
			data-test={test}
			className={cn('text-muted-foreground', className)}
			{...props}
		/>
	)
}

export { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger }
