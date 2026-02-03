import { useSearch } from "@tanstack/react-router";

import { ModuleFeedbackButton } from "@/platform/core/ui/module-feedback-button";
import { ErrorPageShell } from "@/platform/pages/errors/_ui";

function ForbiddenPageComponent() {
	const { from } = useSearch({ from: "/forbidden" });

	return (
		<ErrorPageShell
			title="403 — Доступ запрещён"
			description="У вас нет прав для просмотра этой страницы."
			headerAction={
				<ModuleFeedbackButton
					variant="ghost"
					url={location.href}
					report={{
						code: 403,
						title: "Произошла ошибка в приложении.",
						details: from ? `запрашиваемый ресурс: ${from}` : undefined,
					}}
				/>
			}
		/>
	);
}

export { ForbiddenPageComponent };
