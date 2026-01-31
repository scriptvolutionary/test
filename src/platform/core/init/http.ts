import { useSessionStore } from "@/platform/core/state";
import { logout } from "@/platform/features/auth";
import { useAuthStore } from "@/platform/features/auth/model/auth.store";
import { configureHttp } from "@/platform/infra/http";

export function initHttpSync() {
	useAuthStore.getState().hydrate();

	configureHttp({
		getModuleKey: () => useSessionStore.getState().module,
		getToken: () => useAuthStore.getState().token,
		onUnauthorized: () => logout(),
	});
}
