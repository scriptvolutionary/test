import {
	type DefaultError,
	type QueryKey,
	queryOptions,
	type UseQueryOptions
} from '@tanstack/react-query'

import { buildQueryParams } from '@/shared/api/query-params'
import type { ListParams } from '@/shared/types/list-params'

type Normalizer<TFilters extends Record<string, unknown>, TNormalized> = (
	params: ListParams<TFilters>
) => TNormalized

type KeyFactory<TNormalized, TKey extends QueryKey> = (normalized: TNormalized) => TKey

type ExtraOptions<TQueryFnData, TError, TData, TKey extends QueryKey> = Omit<
	UseQueryOptions<TQueryFnData, TError, TData, TKey>,
	'queryKey' | 'queryFn' | 'select'
>

export function createListQueryOptions<
	TFilters extends Record<string, unknown> = Record<string, never>,
	TQueryFnData = unknown,
	TData = TQueryFnData,
	TError = DefaultError,
	TNormalized extends Record<string, unknown> = Record<string, unknown>,
	TKey extends QueryKey = QueryKey
>(args: {
	getKey: KeyFactory<TNormalized, TKey>
	queryFn: (normalized: TNormalized) => Promise<TQueryFnData>
	normalize?: Normalizer<TFilters, TNormalized>
	staleTime?: number
	select?: (data: TQueryFnData) => TData
	options?: ExtraOptions<TQueryFnData, TError, TData, TKey>
}) {
	const normalize: Normalizer<TFilters, TNormalized> =
		args.normalize ?? ((p) => buildQueryParams(p) as unknown as TNormalized)

	return (
		params?: ListParams<TFilters>,
		override?: ExtraOptions<TQueryFnData, TError, TData, TKey>
	) => {
		const safeParams = params ?? ({} as ListParams<TFilters>)
		const normalized = normalize(safeParams)

		return queryOptions<TQueryFnData, TError, TData, TKey>({
			queryKey: args.getKey(normalized),
			queryFn: () => args.queryFn(normalized),
			staleTime: args.staleTime ?? 30_000,
			select: args.select,
			...(args.options ?? {}),
			...(override ?? {})
		})
	}
}
