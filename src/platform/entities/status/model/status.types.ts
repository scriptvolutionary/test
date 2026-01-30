import type { IdSysnameName } from "@/shared/types/entities";

export type Status = IdSysnameName & {
	priority: number;
	desc: string | number;
};
