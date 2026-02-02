import { isModuleEnabled, type Module } from "@/platform/sdk/modules";

import { routeTree as agroserviceTree } from "@/modules/agroservice";
import { routeTree as csooTree } from "@/modules/csoo";

const modulesRegistry = {
	agroservice: { routeTree: agroserviceTree },
	csoo: { routeTree: csooTree },
};

function getEnabledModules() {
	return (Object.keys(modulesRegistry) as Module[])
		.filter((key) => isModuleEnabled(key))
		.map((key) => ({ key, routeTree: modulesRegistry[key].routeTree }));
}

export { getEnabledModules, modulesRegistry };
