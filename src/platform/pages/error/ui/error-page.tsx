import { useLocation } from "@tanstack/react-router";
import { AlertTriangleIcon } from "lucide-react";

import { ModuleFeedbackButton } from "@/platform/app/ui/module-feedback-button";
import { StatusActions } from "@/platform/app/ui/status-actions";

import { StatusPage } from "@/shared/ui/status-page";

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	return "Неизвестная ошибка";
}

interface Props {
	error: unknown;
}
function ErrorPageComponent({ error }: Props) {
	const location = useLocation();
	const message = getErrorMessage(error);

	return (
		<StatusPage
			icon={<AlertTriangleIcon />}
			title="500 - Произошла ошибка"
			description="Что-то пошло не так. Попробуйте обновить страницу или вернуться в приложение."
			actions={
				<StatusActions
					feedbackButton={
						<ModuleFeedbackButton
							url={location.href}
							report={{
								code: 500,
								title: "Произошла ошибка в приложении.",
								details: message,
							}}
						/>
					}
				/>
			}
		/>
	);
}

export { ErrorPageComponent };
