import { Outlet } from '@tanstack/react-router'

import { Backdrop } from '@/shared/ui/backdrop'
import { SidebarInset, SidebarProvider } from '@/shared/ui/primitives/sidebar'

import { PlatformHeader } from './platform-header'
import { PlatformSidebar } from './platform-sidebar'

export function PlatformShell() {
	return (
		<SidebarProvider
			style={{ '--sidebar-width': 'calc(var(--spacing) * 72)' } as React.CSSProperties}
		>
			<PlatformSidebar />

			<SidebarInset>
				<Backdrop mode='protected' />
				<PlatformHeader />
				<main className='z-10 flex min-h-0 flex-1 flex-col p-4'>
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
