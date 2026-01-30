import type { IdSysnameName } from "@/shared/types/entities";

export type Region = IdSysnameName & { parent_id: number };
