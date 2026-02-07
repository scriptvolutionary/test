import { MailIcon } from 'lucide-react'
import * as React from 'react'

import { InputGroup, InputGroupAddon, InputGroupInput } from './primitives/input-group'

type Props = Omit<
	React.ComponentProps<typeof InputGroupInput>,
	'type' | 'inputMode' | 'autoComplete'
> & {
	icon?: boolean
}

export function EmailInput({ icon = true, ...props }: Props) {
	return (
		<InputGroup>
			{icon ? (
				<InputGroupAddon aria-hidden='true'>
					<MailIcon className='size-4' />
				</InputGroupAddon>
			) : null}

			<InputGroupInput type='email' inputMode='email' autoComplete='email' {...props} />
		</InputGroup>
	)
}
