export type ListBaseParams = {
	page?: number
	per_page?: number
	search?: string
}

export type ListParams<TFilters extends Record<string, unknown> = Record<string, unknown>> =
	ListBaseParams & TFilters
