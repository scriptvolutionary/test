import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Avatar({
	className,
	size = "default",
	test,
	...props
}: AvatarPrimitive.Root.Props & {
	size?: "default" | "sm" | "lg";
	test?: string;
}) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			data-test={test}
			data-size={size}
			className={cn(
				"size-8 rounded-lg after:rounded-lg data-[size=lg]:size-10 data-[size=sm]:size-6 after:border-border group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:mix-blend-darken dark:after:mix-blend-lighten",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarImage({
	className,
	test,
	...props
}: AvatarPrimitive.Image.Props & { test?: string }) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			data-test={test}
			className={cn(
				"rounded-full aspect-square size-full object-cover",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarFallback({
	className,
	test,
	...props
}: AvatarPrimitive.Fallback.Props & { test?: string }) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			data-test={test}
			className={cn(
				"bg-muted text-muted-foreground rounded-lg flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarBadge({
	className,
	test,
	...props
}: React.ComponentProps<"span"> & { test?: string }) {
	return (
		<span
			data-slot="avatar-badge"
			data-test={test}
			className={cn(
				"bg-primary text-primary-foreground ring-background absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 select-none",
				"group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
				"group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
				"group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarGroup({
	className,
	test,
	...props
}: React.ComponentProps<"div"> & { test?: string }) {
	return (
		<div
			data-slot="avatar-group"
			data-test={test}
			className={cn(
				"*:data-[slot=avatar]:ring-background group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarGroupCount({
	className,
	test,
	...props
}: React.ComponentProps<"div"> & { test?: string }) {
	return (
		<div
			data-slot="avatar-group-count"
			data-test={test}
			className={cn(
				"bg-muted text-muted-foreground size-8 rounded-full text-sm group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 ring-background relative flex shrink-0 items-center justify-center ring-2",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage,
};
