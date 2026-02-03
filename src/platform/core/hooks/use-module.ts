import { useNavigate } from "@tanstack/react-router";
import React from "react";

import { useSessionStore } from "@/platform/core/state";
import {
	enabledModuleKeys,
	type Module,
	modulesMap,
} from "@/platform/infra/config";

export function useCurrentModule() {
	const module = useSessionStore((s) => s.module);
	return { module, meta: modulesMap[module] };
}

export function useEnabledModules() {
	return React.useMemo(
		() =>
			enabledModuleKeys.map((key) => ({
				key,
				meta: modulesMap[key],
			})),
		[],
	);
}

export function useSetModule() {
	const navigate = useNavigate();
	const setModule = useSessionStore((s) => s.setModule);

	return React.useCallback(
		(next: Module, opts?: { navigate?: boolean; storeOnly?: boolean }) => {
			if (!enabledModuleKeys.includes(next)) return;

			if (opts?.storeOnly) {
				setModule(next);
				return;
			}

			if (opts?.navigate === false) {
				setModule(next);
				return;
			}

			navigate({ to: `/platform/m/${next}` });
		},
		[navigate, setModule],
	);
}
