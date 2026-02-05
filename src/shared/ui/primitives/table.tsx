import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Table({
	className,
	test,
	...props
}: React.ComponentProps<"table"> & { test?: string }) {
	return (
		<div
			data-slot="table-container"
			data-test={test}
			className="relative w-full overflow-x-auto"
		>
			<table
				data-slot="table"
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({
	className,
	test,
	...props
}: React.ComponentProps<"thead"> & { test?: string }) {
	return (
		<thead
			data-slot="table-header"
			data-test={test}
			className={cn("[&_tr]:border-b", className)}
			{...props}
		/>
	);
}

function TableBody({
	className,
	test,
	...props
}: React.ComponentProps<"tbody"> & { test?: string }) {
	return (
		<tbody
			data-slot="table-body"
			data-test={test}
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	);
}

function TableFooter({
	className,
	test,
	...props
}: React.ComponentProps<"tfoot"> & { test?: string }) {
	return (
		<tfoot
			data-slot="table-footer"
			data-test={test}
			className={cn(
				"bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableRow({
	className,
	test,
	...props
}: React.ComponentProps<"tr"> & { test?: string }) {
	return (
		<tr
			data-slot="table-row"
			data-test={test}
			className={cn(
				"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
				className,
			)}
			{...props}
		/>
	);
}

function TableHead({
	className,
	test,
	...props
}: React.ComponentProps<"th"> & { test?: string }) {
	return (
		<th
			data-slot="table-head"
			data-test={test}
			className={cn(
				"text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableCell({
	className,
	test,
	...props
}: React.ComponentProps<"td"> & { test?: string }) {
	return (
		<td
			data-slot="table-cell"
			data-test={test}
			className={cn(
				"p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableCaption({
	className,
	test,
	...props
}: React.ComponentProps<"caption"> & { test?: string }) {
	return (
		<caption
			data-slot="table-caption"
			data-test={test}
			className={cn("text-muted-foreground mt-4 text-sm", className)}
			{...props}
		/>
	);
}

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
};
