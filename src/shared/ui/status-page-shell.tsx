import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/shared/ui/primitives/empty";

interface Props {
	icon?: React.ReactNode;
	title: string;
	description: React.ReactNode | string;
	details?: React.ReactNode;
	actions?: React.ReactNode;
}

function StatusPageShell({
	icon,
	title,
	description,
	details,
	actions,
}: Props) {
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

				{actions ? (
					<EmptyContent className="flex justify-center flex-row gap-2">
						{actions}
					</EmptyContent>
				) : null}
			</Empty>
		</main>
	);
}

export { StatusPageShell };
