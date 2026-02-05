import { Outlet } from "@tanstack/react-router";

import { Backdrop } from "@/shared/ui/backdrop";
import { SidebarInset, SidebarProvider } from "@/shared/ui/primitives/sidebar";

import { PlatformHeader } from "./platform-header";
import { PlatformSidebar } from "./platform-sidebar";

function PlatformShell() {
	return (
		<SidebarProvider defaultOpen>
			<PlatformSidebar />

			<SidebarInset>
				<Backdrop mode="protected" />
				<PlatformHeader />
				<main className="flex min-h-0 flex-1 flex-col p-4">
					<Outlet />
				</main>
			</SidebarInset>

			{/* md:peer-data-[variant=inset]:p-2 */}
		</SidebarProvider>
	);
}

export { PlatformShell };
