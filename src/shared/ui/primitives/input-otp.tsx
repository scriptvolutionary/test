import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

function InputOTP({
	className,
	containerClassName,
	test,
	...props
}: React.ComponentProps<typeof OTPInput> & {
	containerClassName?: string;
	test?: string;
}) {
	return (
		<OTPInput
			data-slot="input-otp"
			data-test={test}
			containerClassName={cn(
				"cn-input-otp flex items-center has-disabled:opacity-50",
				containerClassName,
			)}
			spellCheck={false}
			className={cn("disabled:cursor-not-allowed", className)}
			{...props}
		/>
	);
}

function InputOTPGroup({
	className,
	test,
	...props
}: React.ComponentProps<"div"> & { test?: string }) {
	return (
		<div
			data-slot="input-otp-group"
			data-test={test}
			className={cn(
				"has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive rounded-lg has-aria-invalid:ring-3 flex items-center",
				className,
			)}
			{...props}
		/>
	);
}

function InputOTPSlot({
	index,
	className,
	test,
	...props
}: React.ComponentProps<"div"> & {
	index: number;
	test?: string;
}) {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

	return (
		<div
			data-slot="input-otp-slot"
			data-test={test}
			data-active={isActive}
			className={cn(
				"dark:bg-input/30 border-input data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive size-8 border-y border-r text-sm transition-all outline-none first:rounded-l-lg first:border-l last:rounded-r-lg data-[active=true]:ring-3 relative flex items-center justify-center data-[active=true]:z-10",
				className,
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="animate-caret-blink bg-foreground duration-2000 h-4 w-px" />
				</div>
			)}
		</div>
	);
}

function InputOTPSeparator({
	test,
	...props
}: React.ComponentProps<"div"> & { test?: string }) {
	return (
		<div
			data-slot="input-otp-separator"
			data-test={test}
			className="[&_svg:not([class*='size-'])]:size-4 flex items-center"
			role="separator"
			{...props}
		>
			<MinusIcon />
		</div>
	);
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
