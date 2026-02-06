import type { IdSysnameName } from '@/shared/types/base-entities'

export type Permission = IdSysnameName & {
	permission_id: number
	methods: string
	route: string
}
