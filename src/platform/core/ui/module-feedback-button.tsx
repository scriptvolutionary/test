import { useMemo } from "react";

import { buildSupportMessage, type SupportReport } from "@/shared/lib/utils";
import { TelegramFeedbackButton } from "@/shared/ui/telegram-feedback-button";

import { useAppStore } from "@/platform/core/state";

interface ModuleFeedbackButtonProps {
	url?: string;
	report: Omit<SupportReport, "url" | "module"> & { module?: string };
}

export function ModuleFeedbackButton({
	url,
	report,
}: ModuleFeedbackButtonProps) {
	const module = useAppStore((s) => s.module);

	const message = useMemo(() => {
		return buildSupportMessage({
			...report,
			url,
			module: report.module ?? module ?? undefined,
		});
	}, [report, url, module]);

	return <TelegramFeedbackButton message={message} />;
}
