import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import { useTheme } from "@/platform/app/hooks";
import { queryClient } from "@/platform/infra/query";

import { router } from "@/app/router";

import { Toaster } from "@/shared/ui/primitives/sonner";

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
