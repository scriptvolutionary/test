import { BellPlusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/shared/ui/primitives/button";
import { Separator } from "@/shared/ui/primitives/separator";
import { SidebarTrigger } from "@/shared/ui/primitives/sidebar";

import { PlatformBreadcrumbs } from "./platform-breadcrumbs";
import { ThemeSwitcher } from "./theme-switcher";

function PlatformHeader() {
	return (
		<header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b rounded-t-xl px-4 backdrop-blur-xs">
			<SidebarTrigger />
			<Separator orientation="vertical" className="h-5" />
			<PlatformBreadcrumbs />
			<div className="ml-auto flex items-center gap-2">
				<ThemeSwitcher />
				<Button
					variant="ghost"
					size="icon-sm"
					aria-label="???????????"
					title="???????????"
				>
					<BellPlusIcon />
				</Button>
				<Button
					variant="ghost"
					size="icon-sm"
					aria-label="??????? ????????"
					title="??????? ????????"
				>
					<PlusIcon />
				</Button>
			</div>
		</header>
	);
}

export { PlatformHeader };
