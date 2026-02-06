import { CheckCheckIcon, EllipsisVerticalIcon } from "lucide-react";

import { BrandItem } from "@/shared/ui/brand-item";
import { Button } from "@/shared/ui/primitives/button";
import {
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
} from "@/shared/ui/primitives/dropdown-menu";
import { SidebarMenuButton } from "@/shared/ui/primitives/sidebar";

import {
	useCurrentModule,
	useEnabledModules,
	useSetModule,
} from "@/platform/core/hooks";

import { SidebarMenuDropdown } from "../_ui/sidebar-menu-dropdown";

function SidebarModuleMenuSwitcher() {
	const modules = useEnabledModules();
	const { module, meta } = useCurrentModule();
	const setModule = useSetModule();

	return (
		<SidebarMenuDropdown
			trigger={
				<SidebarMenuButton
					className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
					size="lg"
					tooltip={meta?.title ?? "Модуль"}
				>
					<BrandItem
						icon={meta?.icon ?? null}
						title={meta?.title ?? "Модуль"}
						description={meta?.description ?? "Выберите модуль"}
					/>
					<EllipsisVerticalIcon className="ml-auto" />
				</SidebarMenuButton>
			}
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
							className="items-start p-2"
							onClick={() => setModule(m.key, { navigate: true })}
						>
							<Button variant="outline" size="icon-sm">
								{Icon ? <Icon className="size-3.5" /> : null}
							</Button>
							<div className="flex flex-col">
								<p className="text-sm font-medium">{m.meta.title}</p>
								<p className="text-xs text-muted-foreground">
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
		</SidebarMenuDropdown>
	);
}

export { SidebarModuleMenuSwitcher };
