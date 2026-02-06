import { type Theme, useSessionStore, useSettingsStore } from '../state'

const resolveScheme = (theme: Theme) => {
	if (theme === 'system') {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	}

	return theme
}

const setColorScheme = (theme: Theme) => {
	const root = document.documentElement
	const resolved = resolveScheme(theme)

	root.setAttribute('data-theme', resolved)
	root.setAttribute('data-module', useSessionStore.getState().module)
}

export const initThemeSync = () => {
	setColorScheme(useSettingsStore.getState().theme)

	useSettingsStore.subscribe((state, prev) => {
		if (state.theme !== prev.theme) {
			setColorScheme(state.theme)
		}
	})

	useSessionStore.subscribe((state, prev) => {
		if (state.module !== prev.module) {
			setColorScheme(useSettingsStore.getState().theme)
		}
	})

	const media = window.matchMedia('(prefers-color-scheme: dark)')
	const onChange = () => {
		if (useSettingsStore.getState().theme === 'system') {
			setColorScheme('system')
		}
	}

	media.addEventListener('change', onChange)
}
