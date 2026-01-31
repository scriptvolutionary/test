import { useSessionStore, useSettingsStore } from "@/platform/core/state";

export function initStoresSync() {
	const settings = useSettingsStore.getState();
	settings.setTheme(settings.theme);
	settings.setLocale(settings.locale);

	const session = useSessionStore.getState();
	session.setModule(session.module);
}
