import { Link } from "@tanstack/react-router";
import { LayoutDashboard, MessageSquareShare, Signpost } from "lucide-react";

import { Button } from "@/shared/ui/primitives/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/shared/ui/primitives/empty";

export function NotFoundPageComponent() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-background px-4">
			<Empty>
				<EmptyHeader>
					<EmptyMedia>
						<Signpost />
					</EmptyMedia>
					<EmptyTitle>404 - Не найдено</EmptyTitle>
					<EmptyDescription>
						Страница, на которую вы попали, не существует.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent className="flex justify-center flex-row gap-2">
					<Button
						render={
							<Link to="/">
								<LayoutDashboard />В дашборд
							</Link>
						}
					/>
					<Button
						variant="outline"
						render={
							<a
								href="https://t.me/revelc_support?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%BE%D0%BF%D0%B0%D0%BB%20%D0%BD%D0%B0%20%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D1%83:%20%22/route%22%20-%20%D0%B2%D1%8B%D1%88%D0%BB%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BA%D0%B0%20404."
								target="_blank"
								rel="noopener noreferrer"
							>
								<MessageSquareShare />
								Обратная связь
							</a>
						}
					/>
				</EmptyContent>
			</Empty>
		</main>
	);
}
