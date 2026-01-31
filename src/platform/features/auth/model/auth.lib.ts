import { useAuthStore } from "@/platform/features/auth/model/auth.store";
import { queryClient } from "@/platform/infra/query";

export function logout() {
	useAuthStore.getState().clearToken();
	queryClient.clear();
}
