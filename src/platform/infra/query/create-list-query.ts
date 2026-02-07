/** biome-ignore-all lint/suspicious/noExplicitAny: <ignore> */
import {
	type DefaultError,
	keepPreviousData,
	type QueryKey,
	queryOptions,
	type UseQueryOptions
} from '@tanstack/react-query'

import { buildQueryParams } from '@/shared/api/query-params'
import type { ListParams } from '@/shared/types/list-params'

/**
 * Normalizer
 *
 * Преобразует ListParams<TFilters> в нормализованный объект, который единообразно используется:
 * - при построении queryKey
 * - при выполнении queryFn
 *
 * Нормализация обычно:
 * - удаляет undefined / пустые значения
 * - применяет стабильные правила сериализации
 * - приводит фильтры к транспортному формату (query params)
 */
type Normalizer<TFilters extends Record<string, unknown>, TNormalized> = (
	params: ListParams<TFilters>
) => TNormalized

/**
 * KeyFactory
 *
 * Строит queryKey на основе нормализованных параметров.
 *
 * queryKey должен отражать все входные параметры, влияющие на результат запроса,
 * иначе кэширование становится некорректным:
 * - разные параметры могут попасть в один и тот же cache entry (неверные данные)
 * - одинаковые параметры могут создать несколько cache entry (лишний кэш)
 */
type KeyFactory<TNormalized, TKey extends QueryKey> = (normalized: TNormalized) => TKey

/**
 * ExtraOptions
 *
 * UseQueryOptions без queryKey/queryFn/select, так как они задаются фабрикой.
 * Это предотвращает случайные переопределения, которые могут рассинхронизировать
 * логику запроса и кэширования.
 */
type ExtraOptions<TQueryFnData, TError, TData, TKey extends QueryKey> = Omit<
	UseQueryOptions<TQueryFnData, TError, TData, TKey>,
	'queryKey' | 'queryFn' | 'select'
>

/**
 * createListQueryOptions
 *
 * Фабрика для стандартизированных list-запросов.
 *
 * Конфигурация:
 * - getKey: построение queryKey по нормализованным параметрам
 * - queryFn: загрузчик данных по нормализованным параметрам
 * - normalize: нормализатор параметров (по умолчанию buildQueryParams)
 * - staleTime/select/options: общие дефолты для запроса
 *
 * Результат:
 * - возвращается функция, которая создаёт queryOptions для конкретного набора params
 * - подходит для useQuery, prefetchQuery, ensureQueryData и других API React Query
 *
 * Дефолты:
 * - staleTime: 30 секунд (если не переопределено)
 * - placeholderData: keepPreviousData (показывает предыдущие данные, пока грузится новый ключ)
 */
export function createListQueryOptions<
	TFilters extends Record<string, any> = Record<string, any>,
	TQueryFnData = unknown,
	TData = TQueryFnData,
	TError = DefaultError,
	TNormalized extends Record<string, any> = Record<string, any>,
	TKey extends QueryKey = QueryKey
>(args: {
	getKey: KeyFactory<TNormalized, TKey>
	queryFn: (normalized: TNormalized) => Promise<TQueryFnData>
	normalize?: Normalizer<TFilters, TNormalized>
	staleTime?: number
	select?: (data: TQueryFnData) => TData
	options?: ExtraOptions<TQueryFnData, TError, TData, TKey>
}) {
	/**
	 * normalize
	 *
	 * По умолчанию используется buildQueryParams, затем результат приводится к TNormalized.
	 * Приведение типов позволяет одному дефолтному нормализатору работать с разными
	 * формами нормализованных параметров.
	 */
	const normalize: Normalizer<TFilters, TNormalized> =
		args.normalize ?? ((p) => buildQueryParams(p) as unknown as TNormalized)

	/**
	 * Возвращаемый билдер
	 *
	 * Создаёт queryOptions для конкретного набора параметров.
	 *
	 * Параметры:
	 * - params: ListParams, из которых получаются нормализованные входы для key и fetcher
	 * - override: переопределения опций на уровне конкретного вызова (retry, gcTime, enabled и т.д.)
	 */
	return (
		params?: ListParams<TFilters>,
		override?: ExtraOptions<TQueryFnData, TError, TData, TKey>
	) => {
		/**
		 * safeParams
		 *
		 * Гарантирует, что в normalize всегда передаётся объект.
		 */
		const safeParams = params ?? ({} as ListParams<TFilters>)

		/**
		 * normalized
		 *
		 * Единый источник истины для queryKey и queryFn.
		 * Чтение внешнего состояния внутри queryFn вместо использования normalized
		 * может привести к несоответствию key/data.
		 */
		const normalized = normalize(safeParams)

		/**
		 * queryOptions
		 *
		 * Возвращает типизированный объект опций, совместимый с React Query API.
		 *
		 * Дефолт placeholderData:
		 * - keepPreviousData оставляет видимыми предыдущие данные, пока новый queryKey загружается
		 * - предотвращает мерцание UI для пагинированных списков и поиска
		 */
		return queryOptions<TQueryFnData, TError, TData, TKey>({
			queryKey: args.getKey(normalized),
			queryFn: () => args.queryFn(normalized),

			staleTime: args.staleTime ?? 30_000,
			select: args.select,

			placeholderData: keepPreviousData,

			...(args.options ?? {}),
			...(override ?? {})
		})
	}
}
