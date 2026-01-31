import { sessionKeys } from "@/platform/entities/session";
import { clearAuthToken } from "@/platform/infra/auth-token";
import { queryClient } from "@/platform/infra/query";

export function logout() {
	clearAuthToken();
	queryClient.setQueryData(sessionKeys.me(), null);
}
