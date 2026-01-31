import { useSearch } from "@tanstack/react-router";
import { Lock } from "lucide-react";

import { ModuleFeedbackButton } from "@/platform/app/ui/module-feedback-button";
import { StatusActions } from "@/platform/app/ui/status-actions";

import { StatusPage } from "@/shared/ui/status-page";

function ForbiddenPageComponent() {
	const { from } = useSearch({ from: "/forbidden" });

	return (
		<StatusPage
			icon={<Lock />}
			title="403 — Доступ запрещён"
			description="У вас нет прав для просмотра этой страницы. Если вы считаете, что это ошибка — обратитесь в поддержку."
			actions={
				<StatusActions
					feedbackButton={
						<ModuleFeedbackButton
							report={{
								code: 403,
								title: "Произошла ошибка в приложении.",
								details: from ? `запрашиваемый ресурс: ${from}` : undefined,
							}}
						/>
					}
				/>
			}
		/>
	);
}

export { ForbiddenPageComponent };
