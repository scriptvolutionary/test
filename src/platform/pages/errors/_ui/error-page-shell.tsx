import * as React from "react";

import { CardDescription } from "@/shared/ui/primitives/card";
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
			<div className="w-full max-w-sm gap-6 py-6 animate-in ease-in-out zoom-in-90 fade-in-15 space-y-12 slide-in-from-bottom-5 duration-200">
				<div className="text-center px-6">
					<div className="text-9xl font-bold">{title}</div>
					{description ? (
						<CardDescription>{description}</CardDescription>
					) : null}
				</div>
				<div className="space-y-6 px-6 max-w-xs mx-auto">
					<StatusActions />
				</div>
			</div>
		</PublicPageShell>
	);
}

export { ErrorPageShell };
