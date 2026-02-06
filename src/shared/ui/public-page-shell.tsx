import { Backdrop } from "./backdrop";
import { BrandItem } from "./brand-item";

interface PublicPageShellProps {
	backdropMode?: "public" | "protected";
	version: React.ReactNode;
	headerAction: React.ReactNode;
	children: React.ReactNode;
}

function PublicPageShell({
	backdropMode = "public",
	headerAction,
	version,
	children,
}: PublicPageShellProps) {
	return (
		<div className="relative min-h-dvh overflow-hidden">
			<Backdrop mode={backdropMode} />

			<div className="relative mx-auto flex min-h-dvh container flex-col px-6 lg:px-12">
				<header className="flex items-center justify-between py-4 lg:py-6">
					<BrandItem />
					{headerAction && headerAction}
				</header>

				<main className="flex flex-1 items-center justify-center">
					{children}
				</main>

				<footer className="py-4 lg:py-6 text-center text-xs text-muted-foreground">
					<span>ООО "Ревелк" © 2026</span>
					<span className="mx-2">·</span>
					<span>Версия: {version}</span>
				</footer>
			</div>
		</div>
	);
}

export { PublicPageShell };
