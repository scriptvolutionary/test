interface PublicPageShellProps {
	backdrop: React.ReactNode;
	version: React.ReactNode;
	headerAction: React.ReactNode;
	children: React.ReactNode;
}

function PublicPageShell({
	backdrop,
	headerAction,
	version,
	children,
}: PublicPageShellProps) {
	return (
		<div className="relative min-h-dvh overflow-hidden">
			{backdrop}

			<div className="relative mx-auto flex min-h-dvh container flex-col px-6 lg:px-12">
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

					{headerAction && headerAction}
				</header>

				<main className="flex flex-1 items-center justify-center">
					{children}
				</main>

				<footer className="pb-8 text-center text-xs text-muted-foreground">
					<span>ООО "Ревелк" © 2026</span>
					<span className="mx-2">·</span>
					<span>Версия: {version}</span>
				</footer>
			</div>
		</div>
	);
}

export { PublicPageShell };
