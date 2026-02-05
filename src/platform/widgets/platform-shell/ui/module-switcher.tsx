import { EllipsisVerticalIcon } from "lucide-react";

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
import { SidebarMenuButton, useSidebar } from "@/shared/ui/primitives/sidebar";

import {
	useCurrentModule,
	useEnabledModules,
	useSetModule,
} from "@/platform/core/hooks";

function ModuleSwitcher() {
	const { open } = useSidebar();
	const modules = useEnabledModules();
	const { module } = useCurrentModule();
	const setModule = useSetModule();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<SidebarMenuButton
						className="aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground"
						size="lg"
					>
						<BrandCard />
						{open && <EllipsisVerticalIcon className="ml-auto" />}
					</SidebarMenuButton>
				}
			/>
			<DropdownMenuContent
				className="min-w-56"
				side={open ? "bottom" : "right"}
				align="center"
				sideOffset={open ? 4 : 20}
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel className="text-muted-foreground text-xs">
						Модули
					</DropdownMenuLabel>
					{modules.map((m) => {
						const Icon = m.meta.icon;

						return (
							<DropdownMenuItem
								key={m.key}
								className="p-2 items-start"
								onClick={() => setModule(m.key, { navigate: true })}
							>
								<Button
									size="icon-sm"
									variant={m.key === module ? "default" : "outline"}
									className="pointer-events-none"
								>
									{Icon ? <Icon className="size-3.5" /> : null}
								</Button>
								<div className="flex flex-col">
									<p className="font-medium text-xs">{m.meta.title}</p>
									<p className="text-muted-foreground text-xs">
										{m.meta.description}
									</p>
								</div>
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export { ModuleSwitcher };
