import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

function Accordion({
	className,
	test,
	...props
}: AccordionPrimitive.Root.Props & { test?: string }) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			data-test={test}
			className={cn("flex w-full flex-col", className)}
			{...props}
		/>
	);
}

function AccordionItem({
	className,
	test,
	...props
}: AccordionPrimitive.Item.Props & { test?: string }) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			data-test={test}
			className={cn("not-last:border-b", className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	test,
	...props
}: AccordionPrimitive.Trigger.Props & { test?: string }) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				data-test={test}
				className={cn(
					"focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground rounded-lg py-2.5 text-left text-sm font-medium hover:underline focus-visible:ring-3 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
					className,
				)}
				{...props}
			>
				{children}
				<ChevronDownIcon
					data-slot="accordion-trigger-icon"
					className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
				/>
				<ChevronUpIcon
					data-slot="accordion-trigger-icon"
					className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	test,
	...props
}: AccordionPrimitive.Panel.Props & { test?: string }) {
	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-content"
			data-test={test}
			className="data-open:animate-accordion-down data-closed:animate-accordion-up text-sm overflow-hidden"
			{...props}
		>
			<div
				className={cn(
					"pt-0 pb-2.5 [&_a]:hover:text-foreground h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
					className,
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	);
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
