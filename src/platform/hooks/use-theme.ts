import { useNexusState } from '@/platform/state/nexus.state'

export const useTheme = () => {
	const theme = useNexusState(s => s.theme)
	const setTheme = useNexusState(s => s.setTheme)

	return { theme, setTheme }
}
