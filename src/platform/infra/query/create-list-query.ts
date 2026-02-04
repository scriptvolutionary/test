/** biome-ignore-all lint/suspicious/noExplicitAny: ignore */

import { queryOptions } from "@tanstack/react-query";

import { buildQueryParams } from "@/shared/api/query-params";
import type { ListParams } from "@/shared/types/list-params";

type AnyKey = readonly unknown[];

export function createListQueryOptions<
	TFilters extends Record<string, unknown> = Record<string, unknown>,
>(args: {
	getKey: (normalizedParams: Record<string, any>) => AnyKey;
	queryFn: (params: ListParams<TFilters>) => Promise<any>;
	staleTime?: number;
}) {
	const staleTime = args.staleTime ?? 30_000;

	return (params?: ListParams<TFilters>) => {
		const safeParams = params ?? ({} as ListParams<TFilters>);
		const normalized = buildQueryParams(safeParams);

		return queryOptions({
			queryKey: args.getKey(normalized),
			queryFn: () => args.queryFn(safeParams),
			staleTime,
		});
	};
}
