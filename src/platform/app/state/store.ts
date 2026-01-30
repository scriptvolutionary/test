import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { enabledModuleKeys, type Module } from "@/platform/infra/config";

export type Theme = "light" | "dark" | "system";
export type Locale = "ru" | "en";

interface SettingsSlice {
	theme: Theme;
	locale: Locale;

	setTheme: (theme: Theme) => void;
	setLocale: (locale: Locale) => void;
}

interface SessionSlice {
	module: Module;
	setModule: (module: Module) => void;
}

export type AppStoreState = SettingsSlice & SessionSlice;

const createSettingsSlice = persist<SettingsSlice>(
	(set) => ({
		theme: "system",
		locale: "ru",

		setTheme: (theme) => set({ theme }),
		setLocale: (locale) => set({ locale }),
	}),
	{
		name: "settings-store",
		storage: createJSONStorage(() => localStorage),
		onRehydrateStorage: () => (state) => {
			if (state) {
				state.setTheme(state.theme);
				state.setLocale(state.locale);
			}
		},
	},
);

const createSessionSlice = persist<SessionSlice>(
	(set) => ({
		module: enabledModuleKeys[0],
		setModule: (module) => set({ module }),
	}),
	{
		name: "session-store",
		storage: createJSONStorage(() => sessionStorage),
		onRehydrateStorage: () => (state) => {
			if (state) {
				state.setModule(state.module);
			}
		},
	},
);

export const useAppStore = create<AppStoreState>()((...a) => ({
	...createSettingsSlice(...a),
	...createSessionSlice(...a),
}));
