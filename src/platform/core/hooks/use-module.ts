import { useAppStore } from "@/platform/core/state";

export const useModule = () => {
	const module = useAppStore((s) => s.module);
	const setModule = useAppStore((s) => s.setModule);

	return { module, setModule };
};
