import type { IdSysnameName } from "@/shared/types/entities";

export type Permission = IdSysnameName & {
	permission_id: number;
	methods: string;
	route: string;
};
