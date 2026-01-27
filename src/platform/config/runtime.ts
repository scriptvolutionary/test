import type { Module } from '../state/nexus.state'

declare const __API_HOST__: string
declare const __API_PORT__: string
declare const __ENV__: 'development' | 'production'
declare const __DEBUG_MODE__: boolean
declare const __ENABLED_MODULES__: Array<'agro' | 'csoo'>

export const runtime = {
	apiUrl: `http://${__API_HOST__}:${__API_PORT__}/api`,
	env: __ENV__,
	debug: __DEBUG_MODE__,
	enabledModules: __ENABLED_MODULES__
}

export const enabledModuleKeys = runtime.enabledModules
export const isModuleEnabled = (key: Module) => enabledModuleKeys.includes(key)
