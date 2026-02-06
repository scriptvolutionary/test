import { useSettingsStore } from '@/platform/core/state'

export const useTheme = () => {
	const theme = useSettingsStore((s) => s.theme)
	const setTheme = useSettingsStore((s) => s.setTheme)

	return { theme, setTheme }
}
