"use client";

import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon, SearchIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/shared/ui/primitives/dialog";
import {
	InputGroup,
	InputGroupAddon,
} from "@/shared/ui/primitives/input-group";

function Command({
	className,
	test,
	...props
}: React.ComponentProps<typeof CommandPrimitive> & { test?: string }) {
	return (
		<CommandPrimitive
			data-slot="command"
			data-test={test}
			className={cn(
				"bg-popover text-popover-foreground rounded-xl! p-1 flex size-full flex-col overflow-hidden",
				className,
			)}
			{...props}
		/>
	);
}

function CommandDialog({
	title = "Command Palette",
	description = "Search for a command to run...",
	children,
	className,
	test,
	showCloseButton = false,
	...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
	title?: string;
	test?: string;
	description?: string;
	className?: string;
	showCloseButton?: boolean;
	children: React.ReactNode;
}) {
	return (
		<Dialog test={test} {...props}>
			<DialogHeader className="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent
				className={cn(
					"rounded-xl! top-1/3 translate-y-0 overflow-hidden p-0",
					className,
				)}
				showCloseButton={showCloseButton}
			>
				{children}
			</DialogContent>
		</Dialog>
	);
}

function CommandInput({
	className,
	test,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & { test?: string }) {
	return (
		<div
			data-slot="command-input-wrapper"
			data-test={test}
			className="p-1 pb-0"
		>
			<InputGroup className="bg-input/30 border-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!">
				<CommandPrimitive.Input
					data-slot="command-input"
					className={cn(
						"w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					{...props}
				/>
				<InputGroupAddon>
					<SearchIcon className="size-4 shrink-0 opacity-50" />
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}

function CommandList({
	className,
	test,
	...props
}: React.ComponentProps<typeof CommandPrimitive.List> & { test?: string }) {
	return (
		<CommandPrimitive.List
			data-slot="command-list"
			data-test={test}
			className={cn(
				"no-scrollbar max-h-72 scroll-py-1 outline-none overflow-x-hidden overflow-y-auto",
				className,
			)}
			{...props}
		/>
	);
}

function CommandEmpty({
	className,
	test,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Empty> & { test?: string }) {
	return (
		<CommandPrimitive.Empty
			data-slot="command-empty"
			data-test={test}
			className={cn("py-6 text-center text-sm", className)}
			{...props}
		/>
	);
}

function CommandGroup({
	className,
	test,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Group> & { test?: string }) {
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			data-test={test}
			className={cn(
				"text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium",
				className,
			)}
			{...props}
		/>
	);
}

function CommandSeparator({
	className,
	test,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Separator> & {
	test?: string;
}) {
	return (
		<CommandPrimitive.Separator
			data-slot="command-separator"
			data-test={test}
			className={cn("bg-border -mx-1 h-px", className)}
			{...props}
		/>
	);
}

function CommandItem({
	className,
	children,
	test,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Item> & { test?: string }) {
	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			data-test={test}
			className={cn(
				"data-selected:bg-muted data-selected:text-foreground data-selected:*:[svg]:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! [&_svg:not([class*='size-'])]:size-4 group/command-item data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			{children}
			<CheckIcon className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
		</CommandPrimitive.Item>
	);
}

function CommandShortcut({
	className,
	test,
	...props
}: React.ComponentProps<"span"> & { test?: string }) {
	return (
		<span
			data-slot="command-shortcut"
			data-test={test}
			className={cn(
				"text-muted-foreground group-data-selected/command-item:text-foreground ml-auto text-xs tracking-widest",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
};
