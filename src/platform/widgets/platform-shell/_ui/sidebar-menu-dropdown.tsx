import * as React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/shared/ui/primitives/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuItem,
	useSidebar,
} from "@/shared/ui/primitives/sidebar";

type DropdownContentProps = React.ComponentProps<typeof DropdownMenuContent>;

type SidebarMenuDropdownProps = {
	trigger: React.ReactElement;
	children: React.ReactNode;
	contentClassName?: string;
	sideMobile?: DropdownContentProps["side"];
	sideDesktop?: DropdownContentProps["side"];
	alignMobile?: DropdownContentProps["align"];
	alignDesktop?: DropdownContentProps["align"];
	sideOffsetMobile?: number;
	sideOffsetDesktop?: number;
};

function SidebarMenuDropdown({
	trigger,
	children,
	contentClassName = "w-(--anchor-width)",
	sideMobile = "bottom",
	sideDesktop = "right",
	alignMobile = "center",
	alignDesktop = "start",
	sideOffsetMobile = 4,
	sideOffsetDesktop = 20,
}: SidebarMenuDropdownProps) {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger render={trigger} />
					<DropdownMenuContent
						className={contentClassName}
						side={isMobile ? sideMobile : sideDesktop}
						align={isMobile ? alignMobile : alignDesktop}
						sideOffset={isMobile ? sideOffsetMobile : sideOffsetDesktop}
					>
						{children}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

export { SidebarMenuDropdown };
