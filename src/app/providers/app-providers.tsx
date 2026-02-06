import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { Toaster } from '@/shared/ui/primitives/sonner'
import { TooltipProvider } from '@/shared/ui/primitives/tooltip'

import { useTheme } from '@/platform/sdk/hooks'
import { queryClient } from '@/platform/sdk/query'

import { router } from '@/app/router'

function AppProviders() {
	const { theme } = useTheme()

	return (
		<TooltipProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} context={{ queryClient }} />
				<Toaster theme={theme} />
			</QueryClientProvider>
		</TooltipProvider>
	)
}

export { AppProviders }
