import { MessageSquareShare } from 'lucide-react'

import { Button, type ButtonProps } from '@/shared/ui/primitives/button'

type TelegramFeedbackButtonProps = ButtonProps & {
	message: string
}

function buildTelegramLink(message: string) {
	return `https://t.me/revelc_support?text=${encodeURIComponent(message)}`
}

export function TelegramFeedbackButton({ message, ...props }: TelegramFeedbackButtonProps) {
	const href = buildTelegramLink(message)

	return (
		<Button
			{...props}
			nativeButton={false}
			variant={props.variant ?? 'outline'}
			render={
				<a
					href={href}
					target='_blank'
					rel='noopener noreferrer'
					className='inline-flex items-center gap-2'
				>
					<MessageSquareShare />
					Обратная связь
				</a>
			}
		/>
	)
}
