import type { IdSysnameName } from "@/shared/types/base-entities";

export type Status = IdSysnameName & {
	priority: number;
	desc: string | number;
};
