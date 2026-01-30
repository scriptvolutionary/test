export const enabledModuleKeys = __ENABLED_MODULES__;

export const runtime = {
	apiUrl: `http://${__API_HOST__}:${__API_PORT__}/api`,
	env: __ENV__,
	debug: __DEBUG_MODE__,
	enabledModuleKeys,
};

export type Module = (typeof __ENABLED_MODULES__)[number];

export const isModuleEnabled = (key: Module) => enabledModuleKeys.includes(key);
