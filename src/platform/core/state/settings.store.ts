import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'
export type Locale = 'ru' | 'en'

type SettingsState = {
	theme: Theme
	locale: Locale
	setTheme: (theme: Theme) => void
	setLocale: (locale: Locale) => void
}

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			theme: 'system',
			locale: 'ru',
			setTheme: (theme) => set({ theme }),
			setLocale: (locale) => set({ locale })
		}),
		{
			name: 'nexus:settings-store',
			storage: createJSONStorage(() => localStorage),
			skipHydration: true
		}
	)
)
