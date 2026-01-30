/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

export type QueryParams = Record<string, unknown>;

export function buildQueryParams(params: QueryParams): Record<string, any> {
	const out: Record<string, any> = {};

	for (const [k, v] of Object.entries(params)) {
		if (v === undefined || v === null || v === "") continue;

		if (Array.isArray(v)) {
			if (v.length === 0) continue;
			out[k] = v;
			continue;
		}

		if (
			typeof v === "string" ||
			typeof v === "number" ||
			typeof v === "boolean"
		) {
			out[k] = v;
			continue;
		}

		out[k] = JSON.stringify(v);
	}

	return out;
}
