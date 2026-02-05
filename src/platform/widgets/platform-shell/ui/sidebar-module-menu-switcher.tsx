import { CheckCheckIcon, EllipsisVerticalIcon } from "lucide-react";

import { BrandCard } from "@/shared/ui/platform-brand";
import { Button } from "@/shared/ui/primitives/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/shared/ui/primitives/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/shared/ui/primitives/sidebar";

import {
	useCurrentModule,
	useEnabledModules,
	useSetModule,
} from "@/platform/core/hooks";

function SidebarModuleMenuSwitcher() {
	const { isMobile } = useSidebar();

	const modules = useEnabledModules();
	const { module, meta } = useCurrentModule();
	const setModule = useSetModule();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton
								className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
								size="lg"
								tooltip={meta.title}
							>
								<BrandCard
									icon={meta.icon}
									title={meta.title}
									description={meta.description}
								/>

								<EllipsisVerticalIcon className="ml-auto" />
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
							<DropdownMenuLabel className="text-muted-foreground text-xs">
								Модули
							</DropdownMenuLabel>
							{modules.map((m) => {
								const isActive = m.key === module;
								const Icon = m.meta.icon;

								return (
									<DropdownMenuItem
										key={m.key}
										className="p-2 items-start"
										onClick={() => setModule(m.key, { navigate: true })}
									>
										<Button variant="outline" size="icon-sm">
											{Icon ? <Icon className="size-3.5" /> : null}
										</Button>
										<div className="flex flex-col">
											<p className="font-medium text-sm">{m.meta.title}</p>
											<p className="text-muted-foreground text-xs">
												{m.meta.description}
											</p>
										</div>
										{isActive && (
											<CheckCheckIcon className="ml-auto text-muted-foreground" />
										)}
									</DropdownMenuItem>
								);
							})}
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

export { SidebarModuleMenuSwitcher };
