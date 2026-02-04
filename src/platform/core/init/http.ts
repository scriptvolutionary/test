import { useSessionStore } from "@/platform/core/state";
import { logout } from "@/platform/features/auth";
import { useAuthStore } from "@/platform/features/auth/model/auth.store";
import { configureHttp, resetHttpAuthHandling } from "@/platform/infra/http";

type HttpNavigation = {
	toLogin: (redirect: string) => void;
	toForbidden: (from: string) => void;
	getCurrentPath: () => string;
};

function isOnPublicPage(path: string) {
	return path.startsWith("/log-in") || path.startsWith("/forbidden");
}

export function initHttpSync(nav: HttpNavigation) {
	useAuthStore.getState().hydrate();

	useAuthStore.subscribe((state, prev) => {
		if (state.token !== prev.token) {
			resetHttpAuthHandling();
		}
	});

	configureHttp({
		getModuleKey: () => useSessionStore.getState().module,
		getToken: () => useAuthStore.getState().token,
		onUnauthorized: () => {
			logout();

			const current = nav.getCurrentPath();
			if (!isOnPublicPage(current)) {
				nav.toLogin(current);
			}
		},

		onForbidden: () => {
			const current = nav.getCurrentPath();
			if (!isOnPublicPage(current)) {
				nav.toForbidden(current);
			}
		},
	});
}
