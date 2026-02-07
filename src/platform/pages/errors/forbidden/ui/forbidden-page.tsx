import { useSearch } from '@tanstack/react-router'

import { ModuleFeedbackButton } from '@/platform/core/ui/module-feedback-button'
import { ErrorPageShell } from '@/platform/pages/errors/_ui'

export function ForbiddenPageComponent() {
	const { from } = useSearch({ from: '/forbidden' })

	return (
		<ErrorPageShell
			title='403'
			description='У вас нет прав для просмотра этой страницы. Если вы считаете что это ошибка - обратитесь к вашему администратору.'
			headerAction={
				<ModuleFeedbackButton
					variant='ghost'
					url={location.href}
					report={{
						code: 403,
						title: 'Произошла ошибка в приложении.',
						details: from ? `запрашиваемый ресурс: ${from}` : undefined
					}}
				/>
			}
		/>
	)
}
