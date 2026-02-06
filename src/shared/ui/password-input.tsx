import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '../lib/utils'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput
} from './primitives/input-group'

interface Props extends Omit<React.ComponentProps<typeof InputGroupInput>, 'type'> {
	defaultShow?: boolean
	icon?: boolean
}

function PasswordInput({ defaultShow = false, icon = true, ...props }: Props) {
	const [show, setShow] = React.useState(defaultShow)

	const masked = !show

	return (
		<InputGroup>
			{icon && (
				<InputGroupAddon>
					<LockIcon className='size-4' />
				</InputGroupAddon>
			)}

			<InputGroupInput
				type='text'
				autoComplete='current-password'
				placeholder='••••••••'
				className={cn(
					masked && 'text tracking-widest [-webkit-text-security:disc] placeholder:text-body'
				)}
				{...props}
			/>

			<InputGroupAddon align='inline-end'>
				<InputGroupButton
					type='button'
					size='icon-xs'
					aria-label={show ? 'Скрыть пароль' : 'Показать пароль'}
					onClick={() => setShow((v) => !v)}
					disabled={props.disabled}
				>
					{show ? <EyeOffIcon className='size-4' /> : <EyeIcon className='size-4' />}
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	)
}

export { PasswordInput }
