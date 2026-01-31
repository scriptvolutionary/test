export type WithId = { id: number };

export type Named = { name: string };
export type Sysnamed = { sysname: string };

export type IdName = WithId & Named;
export type IdSysnameName = WithId & Sysnamed & Named;
