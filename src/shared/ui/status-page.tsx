import { Link } from "@tanstack/react-router";
import { LayoutDashboardIcon } from "lucide-react";

import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/shared/ui/primitives/empty";

import { Button } from "./primitives/button";

type StatusPageProps = {
	icon?: React.ReactNode;
	title: string;
	description: React.ReactNode | string;
	feedbackButton: React.ReactNode;
	details?: React.ReactNode;
};

export function StatusPage({
	icon,
	title,
	description,
	feedbackButton,
	details,
}: StatusPageProps) {
	return (
		<main className="min-h-screen flex items-center justify-center bg-background px-4">
			<Empty>
				<EmptyHeader>
					{icon ? <EmptyMedia>{icon}</EmptyMedia> : null}
					<EmptyTitle>{title}</EmptyTitle>
					{description ? (
						<EmptyDescription>{description}</EmptyDescription>
					) : null}
					{details ? <div className="mt-3">{details}</div> : null}
				</EmptyHeader>

				<EmptyContent className="flex justify-center flex-row gap-2">
					<Button
						render={
							<Link to="/" className="inline-flex items-center gap-2">
								<LayoutDashboardIcon /> В дашборд
							</Link>
						}
					/>

					{feedbackButton}
				</EmptyContent>
			</Empty>
		</main>
	);
}
