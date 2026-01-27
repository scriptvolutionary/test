declare const __API_HOST__: string;
declare const __API_PORT__: string;
declare const __ENV__: "development" | "production";
declare const __DEBUG_MODE__: boolean;
declare const __ENABLED_MODULES__: Array<"agro" | "csoo">;

export const enabledModuleKeys = __ENABLED_MODULES__;

export const runtime = {
	apiUrl: `http://${__API_HOST__}:${__API_PORT__}/api`,
	env: __ENV__,
	debug: __DEBUG_MODE__,
	enabledModuleKeys,
};

export type Module = (typeof __ENABLED_MODULES__)[number];

export const isModuleEnabled = (key: Module) => enabledModuleKeys.includes(key);
