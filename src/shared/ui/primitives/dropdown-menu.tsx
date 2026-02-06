import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function DropdownMenu({ test, ...props }: MenuPrimitive.Root.Props & { test?: string }) {
	return <MenuPrimitive.Root data-slot='dropdown-menu' data-test={test} {...props} />
}

function DropdownMenuPortal({ test, ...props }: MenuPrimitive.Portal.Props & { test?: string }) {
	return <MenuPrimitive.Portal data-slot='dropdown-menu-portal' data-test={test} {...props} />
}

function DropdownMenuTrigger({ test, ...props }: MenuPrimitive.Trigger.Props & { test?: string }) {
	return <MenuPrimitive.Trigger data-slot='dropdown-menu-trigger' data-test={test} {...props} />
}

function DropdownMenuContent({
	align = 'start',
	alignOffset = 0,
	side = 'bottom',
	sideOffset = 4,
	test,
	className,
	...props
}: MenuPrimitive.Popup.Props &
	Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> & {
		test?: string
	}) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner
				className='isolate z-50 outline-none'
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
			>
				<MenuPrimitive.Popup
					data-slot='dropdown-menu-content'
					data-test={test}
					className={cn(
						'data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-md outline-none ring-1 ring-foreground/10 duration-200 data-closed:animate-out data-open:animate-in data-closed:overflow-hidden',
						className
					)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	)
}

function DropdownMenuGroup({ test, ...props }: MenuPrimitive.Group.Props & { test?: string }) {
	return <MenuPrimitive.Group data-slot='dropdown-menu-group' data-test={test} {...props} />
}

function DropdownMenuLabel({
	className,
	inset,
	test,
	...props
}: MenuPrimitive.GroupLabel.Props & {
	inset?: boolean
	test?: string
}) {
	return (
		<MenuPrimitive.GroupLabel
			data-slot='dropdown-menu-label'
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

function DropdownMenuItem({
	className,
	inset,
	test,
	variant = 'default',
	...props
}: MenuPrimitive.Item.Props & {
	inset?: boolean
	variant?: 'default' | 'destructive'
	test?: string
}) {
	return (
		<MenuPrimitive.Item
			data-slot='dropdown-menu-item'
			data-test={test}
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"group/dropdown-menu-item relative flex cursor-default select-none items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden transition-all focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-7 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive",
				className
			)}
			{...props}
		/>
	)
}

function DropdownMenuSub({ test, ...props }: MenuPrimitive.SubmenuRoot.Props & { test?: string }) {
	return <MenuPrimitive.SubmenuRoot data-slot='dropdown-menu-sub' data-test={test} {...props} />
}

function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	test,
	...props
}: MenuPrimitive.SubmenuTrigger.Props & {
	inset?: boolean
	test?: string
}) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot='dropdown-menu-sub-trigger'
			data-test={test}
			data-inset={inset}
			className={cn(
				"flex cursor-default select-none items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-open:bg-accent data-popup-open:bg-accent data-inset:pl-7 data-open:text-accent-foreground data-popup-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className='ml-auto' />
		</MenuPrimitive.SubmenuTrigger>
	)
}

function DropdownMenuSubContent({
	align = 'start',
	alignOffset = -3,
	side = 'right',
	sideOffset = 0,
	test,
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
	return (
		<DropdownMenuContent
			data-slot='dropdown-menu-sub-content'
			data-test={test}
			className={cn(
				'data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-auto min-w-24 rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-200 data-closed:animate-out data-open:animate-in',
				className
			)}
			align={align}
			alignOffset={alignOffset}
			side={side}
			sideOffset={sideOffset}
			{...props}
		/>
	)
}

function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	inset,
	test,
	...props
}: MenuPrimitive.CheckboxItem.Props & {
	inset?: boolean
	test?: string
}) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot='dropdown-menu-checkbox-item'
			data-test={test}
			data-inset={inset}
			className={cn(
				"relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			checked={checked}
			{...props}
		>
			<span
				className='pointer-events-none absolute right-2 flex items-center justify-center'
				data-slot='dropdown-menu-checkbox-item-indicator'
			>
				<MenuPrimitive.CheckboxItemIndicator>
					<CheckIcon />
				</MenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</MenuPrimitive.CheckboxItem>
	)
}

function DropdownMenuRadioGroup({
	test,
	...props
}: MenuPrimitive.RadioGroup.Props & { test?: string }) {
	return (
		<MenuPrimitive.RadioGroup data-slot='dropdown-menu-radio-group' data-test={test} {...props} />
	)
}

function DropdownMenuRadioItem({
	className,
	children,
	inset,
	test,
	...props
}: MenuPrimitive.RadioItem.Props & {
	inset?: boolean
	test?: string
}) {
	return (
		<MenuPrimitive.RadioItem
			data-slot='dropdown-menu-radio-item'
			data-test={test}
			data-inset={inset}
			className={cn(
				"relative flex cursor-default select-none items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-7 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			{...props}
		>
			<span
				className='pointer-events-none absolute right-2 flex items-center justify-center'
				data-slot='dropdown-menu-radio-item-indicator'
			>
				<MenuPrimitive.RadioItemIndicator>
					<CheckIcon />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	)
}

function DropdownMenuSeparator({
	className,
	test,
	...props
}: MenuPrimitive.Separator.Props & { test?: string }) {
	return (
		<MenuPrimitive.Separator
			data-slot='dropdown-menu-separator'
			data-test={test}
			className={cn('-mx-1 my-1 h-px bg-border', className)}
			{...props}
		/>
	)
}

function DropdownMenuShortcut({
	className,
	test,
	...props
}: React.ComponentProps<'span'> & { test?: string }) {
	return (
		<span
			data-slot='dropdown-menu-shortcut'
			data-test={test}
			className={cn(
				'ml-auto text-muted-foreground text-xs tracking-widest group-focus/dropdown-menu-item:text-accent-foreground',
				className
			)}
			{...props}
		/>
	)
}

export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
}
