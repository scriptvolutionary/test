interface BrandCardProps {
	logo?: React.ReactNode;
	title?: React.ReactNode;
	description?: React.ReactNode;
}

function BrandCard({
	logo,
	title = "Nexus",

	description = "Модульная платформа",
}: BrandCardProps) {
	return (
		<div className="flex items-center gap-2">
			<div className="relative flex shrink-0 select-none">
				{logo ? (
					logo
				) : (
					<img
						className="size-8 aspect-square rounded-lg"
						src="/nexus_t_512x512.png"
						alt="Nexus"
					/>
				)}
			</div>
			<div className="grid flex-1 text-left text-xs leading-tight">
				<span className="truncate flex justify-between gap-2 font-medium text-sm">
					{title}
				</span>
				<span className="truncate text-muted-foreground">{description}</span>
			</div>
		</div>
	);
}

export { BrandCard };
