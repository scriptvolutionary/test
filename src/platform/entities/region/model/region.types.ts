import type { IdSysnameName } from "@/shared/types/base-entities";

export type Region = IdSysnameName & { parent_id: number };
