// import { getAppVersion } from '@/shared/lib/app'

// import { getAppVersion } from '@/shared/lib/app'

import { ModuleFeedbackButton } from "@/platform/core/ui/module-feedback-button";
import { ErrorPageShell } from "@/platform/pages/errors/_ui";

function NotFoundPageComponent() {
	return (
		<ErrorPageShell
			title="404"
			description="По всей видимости текущая страница не существует или была удалена."
			headerAction={
				<ModuleFeedbackButton
					variant="ghost"
					report={{
						code: 404,
						title: "Произошла ошибка при открытии страницы.",
					}}
				/>
			}
		/>
	);
}

export { NotFoundPageComponent };
