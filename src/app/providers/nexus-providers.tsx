import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'

import { useTheme } from '@/platform/hooks'
import { queryClient } from '@/platform/infra/query-client'

import { router } from '@/app/router'

import { Toaster } from '@/shared/ui/primitives/sonner'

export function NexusProviders() {
	const { theme } = useTheme()

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				router={router}
				context={{ queryClient }}
			/>

			<Toaster theme={theme} />

			<ReactQueryDevtools buttonPosition="top-right" />
		</QueryClientProvider>
	)
}
