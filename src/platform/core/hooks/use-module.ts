import { useSessionStore } from "@/platform/core/state";

export const useModule = () => {
	const module = useSessionStore((s) => s.module);
	const setModule = useSessionStore((s) => s.setModule);

	return { module, setModule };
};
