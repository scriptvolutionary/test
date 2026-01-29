import type { AnyRoute } from "@tanstack/react-router";

import { isModuleEnabled, type Module } from "@/platform/infra/config";

import { routeTree as agroTree } from "@/modules/agro";
import { routeTree as csooTree } from "@/modules/csoo";

type ModuleDef = { routeTree: AnyRoute };

export const moduleRegistry = {
	agro: { routeTree: agroTree },
	csoo: { routeTree: csooTree },
} as const;

export type ModuleKey = keyof typeof moduleRegistry;

export function getEnabledModules(): Array<{
	key: Module;
	routeTree: AnyRoute;
}> {
	return (Object.entries(moduleRegistry) as Array<[Module, ModuleDef]>)
		.filter(([key]) => isModuleEnabled(key))
		.map(([key, def]) => ({ key, routeTree: def.routeTree }));
}
