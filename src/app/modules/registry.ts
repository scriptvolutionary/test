import type { AnyRoute } from "@tanstack/react-router";

import { isModuleEnabled, type Module } from "@/platform/sdk/modules";

import { routeTree as agroTree } from "@/modules/agro";
import { routeTree as csooTree } from "@/modules/csoo";

type ModuleDef = { routeTree: AnyRoute };

const modulesRegistry = {
	agro: { routeTree: agroTree },
	csoo: { routeTree: csooTree },
} satisfies Record<Module, ModuleDef>;

function getEnabledModules(): Array<{ key: Module; routeTree: AnyRoute }> {
	return (Object.keys(modulesRegistry) as Module[])
		.filter((key) => isModuleEnabled(key))
		.map((key) => ({ key, routeTree: modulesRegistry[key].routeTree }));
}

export { getEnabledModules, modulesRegistry };
