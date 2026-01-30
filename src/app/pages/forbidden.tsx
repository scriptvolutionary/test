import { useSearch } from "@tanstack/react-router";
import { ShieldAlertIcon } from "lucide-react";

import { ModuleFeedbackButton } from "@/platform/app/ui/module-feedback-button";

import { StatusPage } from "@/shared/ui/status-page";

export function ForbiddenPageComponent() {
	const { from } = useSearch({ from: "/forbidden" });

	return (
		<StatusPage
			icon={<ShieldAlertIcon />}
			title="403 — Доступ запрещён"
			description="У вас нет прав для просмотра этой страницы. Если вы считаете, что это ошибка — обратитесь в поддержку."
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
	);
}
