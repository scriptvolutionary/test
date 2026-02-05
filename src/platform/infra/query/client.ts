import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { getToastPayload } from "../http";

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			const { message, description } = getToastPayload(error);

			if (!shouldToast(error)) return;
			toast(message, { description });
		},
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			const { message, description } = getToastPayload(error);

			if (!shouldToast(error)) return;
			toast(message, { description });
		},
	}),
	defaultOptions: {
		queries: {
			retry: false,
			// refetchOnWindowFocus: true,
			// refetchOnReconnect: true,
			// refetchOnMount: true,
		},
		mutations: {
			retry: false,
		},
	},
});

function shouldToast(error: unknown): boolean {
	if (error instanceof DOMException && error.name === "AbortError")
		return false;

	const e = error as AxiosError;
	if (e?.response?.status === 401) return false;
	return true;
}
