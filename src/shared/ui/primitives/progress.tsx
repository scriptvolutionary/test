import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/shared/lib/utils";

function Progress({
	className,
	children,
	value,
	test,
	...props
}: ProgressPrimitive.Root.Props & { test?: string }) {
	return (
		<ProgressPrimitive.Root
			value={value}
			data-slot="progress"
			data-test={test}
			className={cn("flex flex-wrap gap-3", className)}
			{...props}
		>
			{children}
			<ProgressTrack>
				<ProgressIndicator />
			</ProgressTrack>
		</ProgressPrimitive.Root>
	);
}

function ProgressTrack({
	className,
	test,
	...props
}: ProgressPrimitive.Track.Props & { test?: string }) {
	return (
		<ProgressPrimitive.Track
			data-slot="progress-track"
			data-test={test}
			className={cn(
				"bg-muted h-1 rounded-full relative flex w-full items-center overflow-x-hidden",
				className,
			)}
			{...props}
		/>
	);
}

function ProgressIndicator({
	className,
	test,
	...props
}: ProgressPrimitive.Indicator.Props & { test?: string }) {
	return (
		<ProgressPrimitive.Indicator
			data-slot="progress-indicator"
			data-test={test}
			className={cn("bg-primary h-full transition-all", className)}
			{...props}
		/>
	);
}

function ProgressLabel({
	className,
	test,
	...props
}: ProgressPrimitive.Label.Props & { test?: string }) {
	return (
		<ProgressPrimitive.Label
			data-slot="progress-label"
			data-test={test}
			className={cn("text-sm font-medium", className)}
			{...props}
		/>
	);
}

function ProgressValue({
	className,
	test,
	...props
}: ProgressPrimitive.Value.Props & { test?: string }) {
	return (
		<ProgressPrimitive.Value
			data-slot="progress-value"
			data-test={test}
			className={cn(
				"text-muted-foreground ml-auto text-sm tabular-nums",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Progress,
	ProgressIndicator,
	ProgressLabel,
	ProgressTrack,
	ProgressValue,
};
