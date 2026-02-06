import { useNavigate } from "@tanstack/react-router";
import { ChevronsUpDownIcon, LogOutIcon } from "lucide-react";

import {
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/shared/ui/primitives/dropdown-menu";
import { SidebarMenuButton } from "@/shared/ui/primitives/sidebar";

import { useSessionMe } from "@/platform/entities/session";
import { UserProfileItem } from "@/platform/entities/user";
import { logout } from "@/platform/features/auth";

import { SidebarMenuDropdown } from "../_ui/sidebar-menu-dropdown";

function SidebarSessionProfileMenu() {
	const navigate = useNavigate();

	const { data: me, isLoading } = useSessionMe();

	return (
		<SidebarMenuDropdown
			trigger={
				<SidebarMenuButton
					className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
					size="lg"
					tooltip="Профиль"
					disabled={isLoading}
				>
					<UserProfileItem user={me} isLoading={isLoading} />
					<ChevronsUpDownIcon className="ml-auto" />
				</SidebarMenuButton>
			}
		>
			<DropdownMenuGroup>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<UserProfileItem user={me} variant="label" isLoading={isLoading} />
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
		</SidebarMenuDropdown>
	);
}

export { SidebarSessionProfileMenu };
