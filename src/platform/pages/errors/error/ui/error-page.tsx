import { useLocation } from '@tanstack/react-router'

import { ModuleFeedbackButton } from '@/platform/core/ui/module-feedback-button'

import { ErrorPageShell } from '../../_ui'

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message
	if (typeof error === 'string') return error
	return 'Неизвестная ошибка'
}

interface Props {
	error: unknown
}

function ErrorPageComponent({ error }: Props) {
	const location = useLocation()
	const message = getErrorMessage(error)

	return (
		<ErrorPageShell
			title='500'
			description='Что-то пошло не так. Попробуйте обновить страницу или вернуться в приложение.'
			headerAction={
				<ModuleFeedbackButton
					url={location.href}
					report={{
						code: 500,
						title: 'Произошла ошибка в приложении.',
						details: message
					}}
				/>
			}
		/>
	)
}

export { ErrorPageComponent }
