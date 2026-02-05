import { useLocation, useNavigate } from "@tanstack/react-router";
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
	const location = useLocation();
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

			const href =
				typeof location?.href === "string" ? location.href : location.pathname;
			const canNavigate = enabledModuleKeys.some((key) => href.includes(key));

			setModule(next);
			if (!canNavigate) return;

			navigate({ to: `/platform/m/${next}` });
		},
		[navigate, setModule, location],
	);
}
