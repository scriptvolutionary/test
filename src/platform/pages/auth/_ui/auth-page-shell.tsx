import { useLocation } from "@tanstack/react-router";
import * as React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/primitives/card";
import { PublicPageShell } from "@/shared/ui/public-page-shell";

import { useCurrentModule } from "@/platform/core/hooks";
import { ModuleFeedbackButton } from "@/platform/core/ui/module-feedback-button";
import { runtime } from "@/platform/infra/config";

interface AuthPageShellProps {
	title: React.ReactNode;
	description: React.ReactNode;
	children: React.ReactNode;
}

function AuthPageShell({ title, description, children }: AuthPageShellProps) {
	const location = useLocation();
	const { meta } = useCurrentModule();

	return (
		<PublicPageShell
			headerAction={
				<ModuleFeedbackButton
					variant="ghost"
					url={location.href}
					report={{ code: 0, title: "У меня есть вопрос..." }}
				/>
			}
			version={runtime.version}
		>
			<Card className="w-full bg-card/25 max-w-sm gap-6 py-6 animate-in ease-in-out zoom-in-90 fade-in-15 slide-in-from-bottom-5 duration-200">
				<CardHeader className="text-center justify-center px-6">
					<div className="inline-flex items-center gap-2 rounded-full border bg-background/25 px-3 py-1 text-xs text-muted-foreground">
						<span className="font-medium text-foreground/80">{meta.title}</span>
						<span className="opacity-70">·</span>
						<span className="opacity-90">Управление</span>
					</div>
				</CardHeader>
				<CardHeader className="text-center px-6">
					<CardTitle className="text-xl">{title}</CardTitle>
					{description ? (
						<CardDescription>{description}</CardDescription>
					) : null}
				</CardHeader>
				<CardContent className="space-y-6 px-6">{children}</CardContent>
			</Card>
		</PublicPageShell>
	);
}

export { AuthPageShell };
