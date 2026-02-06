import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu'
import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function ContextMenu({ test, ...props }: ContextMenuPrimitive.Root.Props & { test?: string }) {
	return <ContextMenuPrimitive.Root data-slot='context-menu' data-test={test} {...props} />
}

function ContextMenuPortal({
	test,
	...props
}: ContextMenuPrimitive.Portal.Props & { test?: string }) {
	return <ContextMenuPrimitive.Portal data-slot='context-menu-portal' data-test={test} {...props} />
}

function ContextMenuTrigger({
	className,
	test,
	...props
}: ContextMenuPrimitive.Trigger.Props & { test?: string }) {
	return (
		<ContextMenuPrimitive.Trigger
			data-slot='context-menu-trigger'
			data-test={test}
			className={cn('select-none', className)}
			{...props}
		/>
	)
}

function ContextMenuContent({
	className,
	align = 'start',
	alignOffset = 4,
	side = 'right',
	test,
	sideOffset = 0,
	...props
}: ContextMenuPrimitive.Popup.Props &
	Pick<ContextMenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> & {
		test?: string
	}) {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Positioner
				className='isolate z-50 outline-none'
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
			>
				<ContextMenuPrimitive.Popup
					data-slot='context-menu-content'
					data-test={test}
					className={cn(
						'data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 z-50 max-h-(--available-height) min-w-36 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-md outline-none ring-1 ring-foreground/10 duration-200 data-closed:animate-out data-open:animate-in',
						className
					)}
					{...props}
				/>
			</ContextMenuPrimitive.Positioner>
		</ContextMenuPrimitive.Portal>
	)
}

function ContextMenuGroup({
	test,
	...props
}: ContextMenuPrimitive.Group.Props & { test?: string }) {
	return <ContextMenuPrimitive.Group data-slot='context-menu-group' data-test={test} {...props} />
}

function ContextMenuLabel({
	className,
	test,
	inset,
	...props
}: ContextMenuPrimitive.GroupLabel.Props & {
	inset?: boolean
	test?: string
}) {
	return (
		<ContextMenuPrimitive.GroupLabel
			data-slot='context-menu-label'
			data-test={test}
			data-inset={inset}
			className={cn(
				'px-1.5 py-1 font-medium text-muted-foreground text-xs data-inset:pl-7',
				className
			)}
			{...props}
		/>
	)
}

function ContextMenuItem({
	className,
	inset,
	variant = 'default',
	test,
	...props
}: ContextMenuPrimitive.Item.Props & {
	inset?: boolean
	variant?: 'default' | 'destructive'
	test?: string
}) {
	return (
		<ContextMenuPrimitive.Item
			data-slot='context-menu-item'
			data-test={test}
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"group/context-menu-item relative flex cursor-default select-none items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-7 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive",
				className
			)}
			{...props}
		/>
	)
}

function ContextMenuSub({
	test,
	...props
}: ContextMenuPrimitive.SubmenuRoot.Props & { test?: string }) {
	return (
		<ContextMenuPrimitive.SubmenuRoot data-slot='context-menu-sub' data-test={test} {...props} />
	)
}

function ContextMenuSubTrigger({
	className,
	inset,
	children,
	test,
	...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
	inset?: boolean
	test?: string
}) {
	return (
		<ContextMenuPrimitive.SubmenuTrigger
			data-slot='context-menu-sub-trigger'
			data-test={test}
			data-inset={inset}
			className={cn(
				"flex cursor-default select-none items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-inset:pl-7 data-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className='ml-auto' />
		</ContextMenuPrimitive.SubmenuTrigger>
	)
}

function ContextMenuSubContent({
	test,
	...props
}: React.ComponentProps<typeof ContextMenuContent>) {
	return (
		<ContextMenuContent
			data-slot='context-menu-sub-content'
			data-test={test}
			className='shadow-lg'
			side='right'
			{...props}
		/>
	)
}

function ContextMenuCheckboxItem({
	className,
	children,
	checked,
	inset,
	test,
	...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
	inset?: boolean
	test?: string
}) {
	return (
		<ContextMenuPrimitive.CheckboxItem
			data-slot='context-menu-checkbox-item'
			data-inset={inset}
			data-test={test}
			className={cn(
				"relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			checked={checked}
			{...props}
		>
			<span className='pointer-events-none absolute right-2'>
				<ContextMenuPrimitive.CheckboxItemIndicator>
					<CheckIcon />
				</ContextMenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.CheckboxItem>
	)
}

function ContextMenuRadioGroup({
	test,
	...props
}: ContextMenuPrimitive.RadioGroup.Props & { test?: string }) {
	return (
		<ContextMenuPrimitive.RadioGroup
			data-slot='context-menu-radio-group'
			data-test={test}
			{...props}
		/>
	)
}

function ContextMenuRadioItem({
	className,
	children,
	inset,
	test,
	...props
}: ContextMenuPrimitive.RadioItem.Props & {
	inset?: boolean
	test?: string
}) {
	return (
		<ContextMenuPrimitive.RadioItem
			data-slot='context-menu-radio-item'
			data-test={test}
			data-inset={inset}
			className={cn(
				"relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			{...props}
		>
			<span className='pointer-events-none absolute right-2'>
				<ContextMenuPrimitive.RadioItemIndicator>
					<CheckIcon />
				</ContextMenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.RadioItem>
	)
}

function ContextMenuSeparator({
	className,
	test,
	...props
}: ContextMenuPrimitive.Separator.Props & { test?: string }) {
	return (
		<ContextMenuPrimitive.Separator
			data-slot='context-menu-separator'
			data-test={test}
			className={cn('-mx-1 my-1 h-px bg-border', className)}
			{...props}
		/>
	)
}

function ContextMenuShortcut({
	className,
	test,
	...props
}: React.ComponentProps<'span'> & { test?: string }) {
	return (
		<span
			data-slot='context-menu-shortcut'
			data-test={test}
			className={cn(
				'ml-auto text-muted-foreground text-xs tracking-widest group-focus/context-menu-item:text-accent-foreground',
				className
			)}
			{...props}
		/>
	)
}

export {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuPortal,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger
}
