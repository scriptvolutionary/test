import { useNexusState } from '@/platform/app/state/app.state'

export const useModule = () => {
	const module = useNexusState(s => s.module)
	const setModule = useNexusState(s => s.setModule)

	return { module, setModule }
}
