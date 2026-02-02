import { Link } from "@tanstack/react-router";

import { Button } from "@/shared/ui/primitives/button";

function DefaultBrand() {
	return (
		<Button className="rounded-full" variant="ghost" type="button">
			<img className="size-4" src="/nexus_t_512x512.png" alt="Nexus" />
			Nexus
		</Button>
	);
}

interface AuthPageShellProps {
	title: React.ReactNode;
	description?: React.ReactNode;

	children: React.ReactNode;

	footerQuestion?: React.ReactNode;
	footerLinkTo?: string;
	footerLinkLabel?: React.ReactNode;

	brand?: React.ReactNode;
}

function AuthPageShell({
	brand = <DefaultBrand />,
	title,
	description,
	children,
	footerQuestion = "Нет учетной записи?",
	footerLinkTo = "/sign-up",
	footerLinkLabel = "Зарегистрировать",
}: AuthPageShellProps) {
	const hasFooterLink = Boolean(footerLinkTo && footerLinkLabel);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="mx-auto w-full max-w-xs space-y-6">
				<div className="space-y-6 text-center">
					<div className="flex items-center justify-center mx-auto gap-2">
						{brand}
					</div>
					<div>
						<h1 className="text-2xl font-semibold">{title}</h1>
						<p className="text-muted-foreground">{description}</p>
					</div>
				</div>

				<div className="space-y-6">
					{children}

					{hasFooterLink && (
						<div className="text-center text-sm">
							{footerQuestion ? <>{footerQuestion} </> : null}
							<Link
								to={footerLinkTo!}
								className="font-medium text-primary hover:underline"
							>
								{footerLinkLabel}
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export { AuthPageShell };
