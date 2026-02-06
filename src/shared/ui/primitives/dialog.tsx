'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { XIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/primitives/button'

function Dialog({ test, ...props }: DialogPrimitive.Root.Props & { test?: string }) {
	return <DialogPrimitive.Root data-slot='dialog' data-test={test} {...props} />
}

function DialogTrigger({ test, ...props }: DialogPrimitive.Trigger.Props & { test?: string }) {
	return <DialogPrimitive.Trigger data-slot='dialog-trigger' data-test={test} {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />
}

function DialogClose({ test, ...props }: DialogPrimitive.Close.Props & { test?: string }) {
	return <DialogPrimitive.Close data-slot='dialog-close' data-test={test} {...props} />
}

function DialogOverlay({
	className,

	...props
}: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot='dialog-overlay'
			className={cn(
				'data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 isolate z-50 bg-black/10 duration-200 data-closed:animate-out data-open:animate-in supports-backdrop-filter:backdrop-blur-xs',
				className
			)}
			{...props}
		/>
	)
}

function DialogContent({
	className,
	children,
	test,
	showCloseButton = true,
	...props
}: DialogPrimitive.Popup.Props & {
	showCloseButton?: boolean
	test?: string
}) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Popup
				data-slot='dialog-content'
				data-test={test}
				className={cn(
					'data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-4 text-sm outline-none ring-1 ring-foreground/10 duration-200 data-closed:animate-out data-open:animate-in sm:max-w-sm',
					className
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot='dialog-close'
						render={<Button variant='ghost' className='absolute top-2 right-2' size='icon-sm' />}
					>
						<XIcon />
						<span className='sr-only'>Закрыть</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Popup>
		</DialogPortal>
	)
}

function DialogHeader({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='dialog-header'
			data-test={test}
			className={cn('flex flex-col gap-2', className)}
			{...props}
		/>
	)
}

function DialogFooter({
	className,
	showCloseButton = false,
	children,
	test,
	...props
}: React.ComponentProps<'div'> & {
	showCloseButton?: boolean
	test?: string
}) {
	return (
		<div
			data-slot='dialog-footer'
			data-test={test}
			className={cn(
				'-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end',
				className
			)}
			{...props}
		>
			{children}
			{showCloseButton && (
				<DialogPrimitive.Close render={<Button variant='outline' />}>Закрыть</DialogPrimitive.Close>
			)}
		</div>
	)
}

function DialogTitle({
	className,
	test,
	...props
}: DialogPrimitive.Title.Props & { test?: string }) {
	return (
		<DialogPrimitive.Title
			data-slot='dialog-title'
			data-test={test}
			className={cn('font-medium text-base leading-none', className)}
			{...props}
		/>
	)
}

function DialogDescription({
	className,
	test,
	...props
}: DialogPrimitive.Description.Props & { test?: string }) {
	return (
		<DialogPrimitive.Description
			data-slot='dialog-description'
			data-test={test}
			className={cn(
				'text-muted-foreground text-sm *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
				className
			)}
			{...props}
		/>
	)
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger
}
