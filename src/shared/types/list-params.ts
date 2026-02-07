/** biome-ignore-all lint/suspicious/noExplicitAny: <ignore> */

export type ListBaseParams = {
	page?: number
	per_page?: number
	search?: string
}

export type ListParams<TFilters extends Record<string, any> = Record<string, any>> =
	ListBaseParams & TFilters
