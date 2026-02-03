export const enabledModuleKeys = __ENABLED_MODULES__;

export const runtime = {
	apiUrl: `http://${__API_HOST__}:${__API_PORT__}/api`,
	debug: __DEBUG_MODE__,
	enabledModuleKeys,
	version: import.meta.env.DEV ? `dev${__APP_VERSION__}` : __APP_VERSION__,
};

export type Module = (typeof __ENABLED_MODULES__)[number];

export const isModuleEnabled = (key: Module) => enabledModuleKeys.includes(key);

export const modulesMap: Record<
	Module,
	{
		title: string;
		shortTitle?: string;
		description?: string;
		icon?: string;
	}
> = {
	agroservice: { title: "Мои растения" },
	csoo: { title: "ЦСОО" },
};
