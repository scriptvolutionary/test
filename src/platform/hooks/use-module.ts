import { useNexusState } from '@/platform/state/nexus.state'

export const useModule = () => {
	const module = useNexusState(s => s.module)
	const setModule = useNexusState(s => s.setModule)

	return { module, setModule }
}
