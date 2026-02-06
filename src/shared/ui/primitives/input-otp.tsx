import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function InputOTP({
	className,
	containerClassName,
	test,
	...props
}: React.ComponentProps<typeof OTPInput> & {
	containerClassName?: string
	test?: string
}) {
	return (
		<OTPInput
			data-slot='input-otp'
			data-test={test}
			containerClassName={cn(
				'cn-input-otp flex items-center has-disabled:opacity-50',
				containerClassName
			)}
			spellCheck={false}
			className={cn('disabled:cursor-not-allowed', className)}
			{...props}
		/>
	)
}

function InputOTPGroup({
	className,
	test,
	...props
}: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='input-otp-group'
			data-test={test}
			className={cn(
				'flex items-center rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40',
				className
			)}
			{...props}
		/>
	)
}

function InputOTPSlot({
	index,
	className,
	test,
	...props
}: React.ComponentProps<'div'> & {
	index: number
	test?: string
}) {
	const inputOTPContext = React.useContext(OTPInputContext)
	const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

	return (
		<div
			data-slot='input-otp-slot'
			data-test={test}
			data-active={isActive}
			className={cn(
				'relative flex size-8 items-center justify-center border-input border-y border-r text-sm outline-none transition-all first:rounded-l-lg first:border-l last:rounded-r-lg aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40',
				className
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
					<div className='h-4 w-px animate-caret-blink bg-foreground duration-2000' />
				</div>
			)}
		</div>
	)
}

function InputOTPSeparator({ test, ...props }: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='input-otp-separator'
			data-test={test}
			className="flex items-center [&_svg:not([class*='size-'])]:size-4"
			role='separator'
			{...props}
		>
			<MinusIcon />
		</div>
	)
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
