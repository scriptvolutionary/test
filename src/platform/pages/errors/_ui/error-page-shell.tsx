import * as React from "react";

import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/ui/primitives/card";
import { PublicPageShell } from "@/shared/ui/public-page-shell";

import { StatusActions } from "@/platform/core/ui/status-actions";
import { runtime } from "@/platform/infra/config";

interface ErrorPageShellProps {
	title: React.ReactNode;
	description: React.ReactNode;
	headerAction: React.ReactNode;
}

function ErrorPageShell({
	headerAction,
	title,
	description,
}: ErrorPageShellProps) {
	return (
		<PublicPageShell headerAction={headerAction} version={runtime.version}>
			<Card className="w-full bg-card/25 max-w-xs gap-6 py-6 animate-in ease-in-out zoom-in-90 fade-in-15 slide-in-from-bottom-5 duration-300">
				<CardHeader className="text-center px-6">
					<CardTitle className="text-xl">{title}</CardTitle>
					{description ? (
						<CardDescription>{description}</CardDescription>
					) : null}
				</CardHeader>
				<CardFooter className="space-y-6 px-6">
					<StatusActions />
				</CardFooter>
			</Card>
		</PublicPageShell>
	);
}

export { ErrorPageShell };
