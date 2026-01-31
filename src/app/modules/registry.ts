import type { AnyRoute } from "@tanstack/react-router";

import { isModuleEnabled, type Module } from "@/platform/sdk/modules";

import { routeTree as agroserviceTree } from "@/modules/agroservice";
import { routeTree as csooTree } from "@/modules/csoo";

type ModuleDef = { routeTree: AnyRoute };

const modulesRegistry = {
	agroservice: { routeTree: agroserviceTree },
	csoo: { routeTree: csooTree },
} satisfies Record<Module, ModuleDef>;

function getEnabledModules(): Array<{ key: Module; routeTree: AnyRoute }> {
	return (Object.keys(modulesRegistry) as Module[])
		.filter((key) => isModuleEnabled(key))
		.map((key) => ({ key, routeTree: modulesRegistry[key].routeTree }));
}

export { getEnabledModules, modulesRegistry };
