export type HttpConfig = {
	getModuleKey?: () => string | null
	getToken?: () => string | null
	onUnauthorized?: () => void
	onForbidden?: () => void
}

let config: HttpConfig = {}

export function configureHttp(next: HttpConfig) {
	config = { ...config, ...next }
}

export function getHttpConfig(): HttpConfig {
	return config
}
