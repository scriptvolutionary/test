import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import { Toaster } from "@/shared/ui/primitives/sonner";

import { useTheme } from "@/platform/sdk/hooks";
import { queryClient } from "@/platform/sdk/query";

import { router } from "@/app/router";

function AppProviders() {
	const { theme } = useTheme();

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} context={{ queryClient }} />

			<Toaster theme={theme} />
		</QueryClientProvider>
	);
}

export { AppProviders };
