import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import * as React from "react";

import { modulesMap } from "@/platform/infra/config";

import { platformMenuItems } from "../model/menu";

interface Crumb {
	label: string;
	to: string;
}

function PlatformBreadcrumbs() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	const crumbs = React.useMemo<Crumb[]>(() => {
		const cleanPath =
			pathname.endsWith("/") && pathname !== "/"
				? pathname.slice(0, -1)
				: pathname;

		const segments = cleanPath.split("/").filter(Boolean);
		if (segments[0] !== "platform") return [];

		const list: Crumb[] = [{ label: "?????????", to: "/platform" }];

		if (segments[1] === "m" && segments[2]) {
			const key = segments[2];
			const meta = modulesMap[key as keyof typeof modulesMap];
			list.push({
				label: meta?.title ?? key,
				to: `/platform/m/${key}`,
			});
			return list;
		}

		const section = platformMenuItems.find(
			(item) => item.to !== "/platform" && cleanPath.startsWith(item.to),
		);
		if (section) {
			list.push({ label: section.label, to: section.to });
		}

		return list;
	}, [pathname]);

	if (!crumbs.length) return null;

	return (
		<nav aria-label="Breadcrumbs">
			<ol className="flex items-center gap-1 text-sm text-muted-foreground">
				{crumbs.map((crumb, index) => {
					const isLast = index === crumbs.length - 1;

					return (
						<li key={crumb.to} className="flex items-center gap-1">
							{isLast ? (
								<span className="text-foreground">{crumb.label}</span>
							) : (
								<Link to={crumb.to} className="hover:text-foreground">
									{crumb.label}
								</Link>
							)}
							{!isLast ? (
								<ChevronRightIcon className="size-3.5 text-muted-foreground" />
							) : null}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}

export { PlatformBreadcrumbs };
