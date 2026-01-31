import { useLocation } from "@tanstack/react-router";
import { BadgeAlertIcon } from "lucide-react";

import { ModuleFeedbackButton } from "@/platform/app/ui/module-feedback-button";
import { StatusActions } from "@/platform/app/ui/status-actions";

import { Kbd } from "@/shared/ui/primitives/kbd";
import { StatusPage } from "@/shared/ui/status-page";

function NotFoundPageComponent() {
	const location = useLocation();

	return (
		<StatusPage
			icon={<BadgeAlertIcon />}
			title="404 - Не найдено"
			description={
				<>
					Страница по пути{" "}
					<Kbd className="text-muted-foreground break-all">
						{location.pathname}
					</Kbd>{" "}
					не существует.
				</>
			}
			actions={
				<StatusActions
					feedbackButton={
						<ModuleFeedbackButton
							url={location.href}
							report={{
								code: 404,
								title: "Произошла ошибка при открытии страницы.",
							}}
						/>
					}
				/>
			}
		/>
	);
}

export { NotFoundPageComponent };
