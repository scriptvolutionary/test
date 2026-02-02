import * as React from "react";

import { getAppVersion } from "@/shared/lib/app";
import { Button } from "@/shared/ui/primitives/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/primitives/card";

import { AuthBackdrop } from "./auth-backdrop";

interface Props {
	title: string;
	description?: string;
	children: React.ReactNode;
	headerAction?: React.ReactNode;
	footerRight?: React.ReactNode;
	maxWidthClassName?: string;
}

function AuthPageShell({
	title,
	description,
	children,
	headerAction,
	footerRight,
}: Props) {
	const version = getAppVersion();

	return (
		<div className="relative min-h-dvh overflow-hidden">
			<AuthBackdrop />

			<div className="relative mx-auto flex min-h-dvh container flex-col px-12">
				<header className="flex items-center justify-between py-6">
					<div className="flex items-center gap-2">
						<div className="grid place-items-center">
							<img
								className="size-8 opacity-80"
								src="/nexus_t_512x512.png"
								alt="Nexus"
							/>
						</div>
						<div className="leading-tight">
							<div className="text-sm font-semibold">Nexus</div>
							<div className="text-xs text-muted-foreground">
								Модульная платформа
							</div>
						</div>
					</div>

					{headerAction ?? <Button variant="ghost">Помощь</Button>}
				</header>

				<main className="flex flex-1 items-center justify-center">
					<Card className="w-full bg-card/50 max-w-sm gap-6 py-6 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300">
						<CardHeader className="text-center px-6">
							<CardTitle className="text-xl">{title}</CardTitle>
							{description ? (
								<CardDescription>{description}</CardDescription>
							) : null}
						</CardHeader>

						<CardContent className="space-y-6 px-6">{children}</CardContent>
					</Card>
				</main>

				<footer className="pb-8 text-center text-xs text-muted-foreground">
					<span>ООО "Ревелк" © 2026</span>
					<span className="mx-2">·</span>
					{footerRight ?? <span>Версия: {version}</span>}
				</footer>
			</div>
		</div>
	);
}

export { AuthPageShell };
