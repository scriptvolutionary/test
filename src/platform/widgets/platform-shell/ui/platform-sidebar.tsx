import { Link, useRouterState } from "@tanstack/react-router";
import * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/shared/ui/primitives/sidebar";

import { SessionProfileCard } from "@/platform/entities/session";

import { platformMenuItems } from "../model/menu";
import { ModuleSwitcher } from "./module-switcher";

function PlatformSidebar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [query, setQuery] = React.useState("");

	const cleanPath =
		pathname.endsWith("/") && pathname !== "/"
			? pathname.slice(0, -1)
			: pathname;

	const isActive = React.useCallback(
		(to: string) => {
			if (to === "/platform") {
				return cleanPath === "/platform";
			}
			return cleanPath.startsWith(to);
		},
		[cleanPath],
	);

	const filteredMenu = React.useMemo(() => {
		const normalized = query.trim().toLowerCase();
		if (!normalized) return platformMenuItems;
		return platformMenuItems.filter((item) =>
			item.label.toLowerCase().includes(normalized),
		);
	}, [query]);

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<ModuleSwitcher />
					</SidebarMenuItem>
				</SidebarMenu>
				{/* <div className="relative">
					<SearchIcon className="pointer-events-none absolute left-2 top-2 size-4 text-muted-foreground" />
					<SidebarInput
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Поиск по меню..."
						className="pl-8"
					/>
				</div> */}
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Навигация</SidebarGroupLabel>
					<SidebarGroupContent className="space-y-2">
						{filteredMenu.length ? (
							<SidebarMenu>
								{filteredMenu.map((item) => (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											isActive={isActive(item.to)}
											tooltip={item.label}
											render={
												<Link to={item.to}>
													<item.icon />
													<span>{item.label}</span>
												</Link>
											}
										/>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						) : (
							<div className="px-2 py-1 text-xs text-muted-foreground">
								Ничего не найдено
							</div>
						)}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SessionProfileCard />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}

export { PlatformSidebar };
