import { useLocation } from "@tanstack/react-router";
import { BadgeAlertIcon } from "lucide-react";

import { Kbd } from "@/shared/ui/primitives/kbd";
import { StatusPageShell } from "@/shared/ui/status-page-shell";

import { ModuleFeedbackButton } from "@/platform/core/ui/module-feedback-button";
import { StatusActions } from "@/platform/core/ui/status-actions";

function NotFoundPageComponent() {
	const location = useLocation();

	return (
		<StatusPageShell
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
