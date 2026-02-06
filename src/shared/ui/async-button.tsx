import { cn } from '../lib/utils'
import { Button, type ButtonProps } from './primitives/button'
import { Spinner } from './primitives/spinner'

interface AsyncButtonProps extends ButtonProps {
	isPending: boolean
	pendingLabel?: React.ReactNode
	label: React.ReactNode
}

function AsyncButton({
	className,
	isPending,
	pendingLabel = 'Запрашиваю...',
	label,
	...props
}: AsyncButtonProps) {
	return (
		<Button
			className={cn('w-full', className)}
			type={props.type ?? 'submit'}
			aria-busy={isPending}
			size='lg'
			disabled={isPending || props.disabled}
			{...props}
		>
			{isPending ? (
				<>
					<Spinner className='size-4 animate-spin' />
					{pendingLabel}
				</>
			) : (
				label
			)}
		</Button>
	)
}

export { AsyncButton }
