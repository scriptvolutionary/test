import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function Label({ className, test, ...props }: React.ComponentProps<'label'> & { test?: string }) {
	return (
		<label
			data-slot='label'
			data-test={test}
			className={cn(
				'flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
				className
			)}
			{...props}
		/>
	)
}

export { Label }
