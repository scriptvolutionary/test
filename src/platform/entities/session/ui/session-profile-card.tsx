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
import { SidebarMenuButton, useSidebar } from "@/shared/ui/primitives/sidebar";

import { UserProfileCard } from "@/platform/entities/user";
import { logout } from "@/platform/features/auth";

import { useSessionMe } from "../model/use-session-me";

function SessionProfileCard() {
	const navigate = useNavigate();
	const { isMobile } = useSidebar();

	const { data, isLoading } = useSessionMe();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<SidebarMenuButton
						className="aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground"
						size="lg"
						tooltip="Профиль"
						disabled={isLoading}
					>
						<UserProfileCard data={data} isLoading={isLoading} />
					</SidebarMenuButton>
				}
			/>
			<DropdownMenuContent
				className="min-w-56"
				side={isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={20}
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel className="p-0 font-normal">
						<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
							<UserProfileCard data={data} />
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
	);
}

export { SessionProfileCard };
