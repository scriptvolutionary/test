import { cn } from "@/shared/lib/utils/cn";

function Kbd({
	className,
	test,
	...props
}: React.ComponentProps<"kbd"> & { test?: string }) {
	return (
		<kbd
			data-slot="kbd"
			data-test={test}
			className={cn(
				"bg-muted text-muted-foreground in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 h-5 w-fit min-w-5 gap-1 rounded-sm px-1 font-sans text-xs font-medium [&_svg:not([class*='size-'])]:size-3 pointer-events-none inline-flex items-center justify-center select-none",
				className,
			)}
			{...props}
		/>
	);
}

function KbdGroup({
	className,
	test,
	...props
}: React.ComponentProps<"div"> & { test?: string }) {
	return (
		<kbd
			data-slot="kbd-group"
			data-test={test}
			className={cn("gap-1 inline-flex items-center", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };
