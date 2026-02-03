import React from "react";

import { buildSupportMessage, type SupportReport } from "@/shared/lib/utils";
import type { ButtonProps } from "@/shared/ui/primitives/button";
import { TelegramFeedbackButton } from "@/shared/ui/telegram-feedback-button";

import { useCurrentModule } from "../hooks";

interface ModuleFeedbackButtonProps {
	url?: string;
	report: Omit<SupportReport, "url" | "module"> & { module?: string };
	variant?: ButtonProps["variant"];
}

function ModuleFeedbackButton({
	url,
	variant,
	report,
}: ModuleFeedbackButtonProps) {
	const { module } = useCurrentModule();

	const message = React.useMemo(() => {
		return buildSupportMessage({
			...report,
			url,
			module: report.module ?? module ?? undefined,
		});
	}, [report, url, module]);

	return <TelegramFeedbackButton variant={variant} message={message} />;
}

export { ModuleFeedbackButton };
