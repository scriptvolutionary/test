import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

function Accordion({
	className,
	test,
	...props
}: AccordionPrimitive.Root.Props & { test?: string }) {
	return (
		<AccordionPrimitive.Root
			data-slot='accordion'
			data-test={test}
			className={cn('flex w-full flex-col', className)}
			{...props}
		/>
	)
}

function AccordionItem({
	className,
	test,
	...props
}: AccordionPrimitive.Item.Props & { test?: string }) {
	return (
		<AccordionPrimitive.Item
			data-slot='accordion-item'
			data-test={test}
			className={cn('not-last:border-b', className)}
			{...props}
		/>
	)
}

function AccordionTrigger({
	className,
	children,
	test,
	...props
}: AccordionPrimitive.Trigger.Props & { test?: string }) {
	return (
		<AccordionPrimitive.Header className='flex'>
			<AccordionPrimitive.Trigger
				data-slot='accordion-trigger'
				data-test={test}
				className={cn(
					'group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground',
					className
				)}
				{...props}
			>
				{children}
				<ChevronDownIcon
					data-slot='accordion-trigger-icon'
					className='pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden'
				/>
				<ChevronUpIcon
					data-slot='accordion-trigger-icon'
					className='pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline'
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	)
}

function AccordionContent({
	className,
	children,
	test,
	...props
}: AccordionPrimitive.Panel.Props & { test?: string }) {
	return (
		<AccordionPrimitive.Panel
			data-slot='accordion-content'
			data-test={test}
			className='overflow-hidden text-sm data-closed:animate-accordion-up data-open:animate-accordion-down'
			{...props}
		>
			<div
				className={cn(
					'h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
					className
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	)
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
