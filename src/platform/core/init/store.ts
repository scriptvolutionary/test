/** biome-ignore-all lint/suspicious/noExplicitAny: ignore */
import { useSessionStore, useSettingsStore } from "@/platform/core/state";

async function seedIfMissing(store: any, storageKey: string) {
	const storage = store.persist?.getOptions?.().storage;
	const getItem = storage?.getItem?.bind(storage);
	const setItem = storage?.setItem?.bind(storage);

	if (!getItem || !setItem) return;

	const existing = await getItem(storageKey);
	if (existing != null) return;

	store.setState(store.getState(), true);
}

export async function initStoresSync() {
	await Promise.all([
		useSettingsStore.persist.rehydrate(),
		useSessionStore.persist.rehydrate(),
	]);

	await Promise.all([
		seedIfMissing(useSettingsStore, "settings-store"),
		seedIfMissing(useSessionStore, "session-store"),
	]);
}
