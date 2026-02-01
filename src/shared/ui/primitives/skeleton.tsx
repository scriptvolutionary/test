import { cn } from "@/shared/lib/utils";

function Skeleton({
	className,
	test,
	...props
}: React.ComponentProps<"div"> & { test?: string }) {
	return (
		<div
			data-slot="skeleton"
			data-test={test}
			className={cn("bg-muted rounded-md animate-pulse", className)}
			{...props}
		/>
	);
}

export { Skeleton };
