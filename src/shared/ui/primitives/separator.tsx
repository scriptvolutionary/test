'use client'

import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'

import { cn } from '@/shared/lib/utils'

function Separator({
	className,
	test,
	orientation = 'horizontal',
	...props
}: SeparatorPrimitive.Props & { test?: string }) {
	return (
		<SeparatorPrimitive
			data-slot='separator'
			data-test={test}
			orientation={orientation}
			className={cn(
				'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
				className
			)}
			{...props}
		/>
	)
}

export { Separator }
