export function getAppVersion() {
	if (import.meta.env.DEV) return "dev";
	return __APP_VERSION__;
}
