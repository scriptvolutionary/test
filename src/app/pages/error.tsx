import { AlertTriangleIcon } from "lucide-react";

import { ModuleFeedbackButton } from "@/platform/app/ui/module-feedback-button";

import { StatusPage } from "@/shared/ui/status-page";

interface ErrorPageComponentProps {
	error: unknown;
}

export function ErrorPageComponent({ error }: ErrorPageComponentProps) {
	const message = getErrorMessage(error);

	return (
		<StatusPage
			icon={<AlertTriangleIcon />}
			title="500 - Произошла ошибка"
			description="Что-то пошло не так. Попробуйте обновить страницу или вернуться в приложение."
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
	);
}

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	return "Неизвестная ошибка";
}
