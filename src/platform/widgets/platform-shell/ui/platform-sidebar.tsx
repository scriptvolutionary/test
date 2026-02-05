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
	SidebarSeparator,
} from "@/shared/ui/primitives/sidebar";

import { ModuleFeedbackButton } from "@/platform/core/ui/module-feedback-button";

import { platformMenuItems } from "../model/menu";
import { SidebarModuleMenuSwitcher } from "./sidebar-module-menu-switcher";
import { SidebarSessionProfileMenu } from "./sidebar-session-profile-menu";

function PlatformSidebar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });

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

	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarHeader>
				<SidebarModuleMenuSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Платформа</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{platformMenuItems.map((item) => (
								<SidebarMenuItem key={item.id}>
									<SidebarMenuButton
										isActive={isActive(item.to)}
										tooltip={item.label}
										render={
											<Link to={item.to}>
												<item.icon />
												{item.label}
											</Link>
										}
									/>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup className="mt-auto">
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									className="justify-start"
									size="sm"
									tooltip="Обратная связь"
									render={
										<ModuleFeedbackButton
											variant="ghost"
											size="sm"
											report={{
												title: "Здравствуйте, у меня возник вопрос...",
											}}
										/>
									}
								/>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarSeparator />
			<SidebarFooter>
				<SidebarSessionProfileMenu />
			</SidebarFooter>
		</Sidebar>
	);
}

export { PlatformSidebar };
