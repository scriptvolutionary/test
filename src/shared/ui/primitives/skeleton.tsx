import { cn } from '@/shared/lib/utils'

function Skeleton({ className, test, ...props }: React.ComponentProps<'div'> & { test?: string }) {
	return (
		<div
			data-slot='skeleton'
			data-test={test}
			className={cn('animate-pulse rounded-md bg-muted', className)}
			{...props}
		/>
	)
}

export { Skeleton }
