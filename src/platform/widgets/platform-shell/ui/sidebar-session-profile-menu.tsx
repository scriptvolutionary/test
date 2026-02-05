import { useNavigate } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/ui/primitives/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/shared/ui/primitives/sidebar";

import { useSessionMe } from "@/platform/entities/session";
import { UserProfile } from "@/platform/entities/user";
import { logout } from "@/platform/features/auth";

function SidebarSessionProfileMenu() {
	const navigate = useNavigate();
	const { isMobile } = useSidebar();

	const { data: me, isLoading } = useSessionMe();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton
								className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
								size="lg"
								tooltip="Профиль"
								disabled={isLoading}
							>
								<UserProfile user={me} isLoading={isLoading} />
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent
						className="w-(--anchor-width)"
						side={isMobile ? "bottom" : "right"}
						align={isMobile ? "center" : "start"}
						sideOffset={isMobile ? 4 : 20}
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<UserProfile user={me} variant="label" />
								</div>
							</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								variant="destructive"
								onClick={() => {
									logout();
									navigate({ to: "/log-in" });
								}}
							>
								<LogOutIcon />
								Выйти из аккаунта
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

export { SidebarSessionProfileMenu };
