import { useNexusState } from "@/platform/app/state";

export const useTheme = () => {
	const theme = useNexusState((s) => s.theme);
	const setTheme = useNexusState((s) => s.setTheme);

	return { theme, setTheme };
};
