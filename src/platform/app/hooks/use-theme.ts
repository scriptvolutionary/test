import { useAppStore } from "@/platform/app/state";

export const useTheme = () => {
	const theme = useAppStore((s) => s.theme);
	const setTheme = useAppStore((s) => s.setTheme);

	return { theme, setTheme };
};
