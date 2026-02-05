import type { LucideIcon } from "lucide-react";
import * as React from "react";

interface BrandCardProps {
	logo?: React.ReactNode;
	icon?: LucideIcon | null;
	title?: React.ReactNode;
	description?: React.ReactNode;
}

export function BrandCard({
	logo,
	icon,
	title = "Nexus",
	description = "Модульная платформа",
}: BrandCardProps) {
	const latestRef = React.useRef({
		logo,
		icon,
		title,
		description,
	});

	React.useEffect(() => {
		latestRef.current = { logo, icon, title, description };
	}, [logo, icon, title, description]);

	const [visible, setVisible] = React.useState(true);
	const [snap, setSnap] = React.useState(() => ({
		logo,
		icon,
		title,
		description,
	}));

	React.useEffect(() => {
		setVisible(false);
		const t = window.setTimeout(() => {
			setSnap({ logo, icon, title, description });
			setVisible(true);
		}, 160);
		return () => window.clearTimeout(t);
	}, [logo, icon, title, description]);

	const Icon = snap.icon;

	return (
		<div className="flex items-center gap-2">
			<div
				className={[
					"relative flex shrink-0 select-none",
					"transition-all duration-200 ease-out",
					visible ? "opacity-100" : "opacity-0",
				].join(" ")}
			>
				{snap.logo ? (
					snap.logo
				) : Icon ? (
					<div className="bg-sidebar-primary bg-linear-to-br to-muted/75 text-sidebar-primary-foreground size-8 grid place-items-center rounded-lg border border-transparent bg-clip-padding">
						<Icon />
					</div>
				) : (
					<img
						className="size-8 aspect-square rounded-lg"
						src="/nexus_t_512x512.png"
						alt="Nexus"
					/>
				)}
			</div>

			<div
				className={[
					"grid flex-1 text-left text-xs leading-tight",
					"transition-all duration-200 ease-out",
					visible ? "opacity-100" : "opacity-0",
				].join(" ")}
			>
				<span className="truncate flex justify-between gap-2 font-medium text-sm">
					{snap.title}
				</span>
				<span className="truncate text-muted-foreground">
					{snap.description}
				</span>
			</div>
		</div>
	);
}
