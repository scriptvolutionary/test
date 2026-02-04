import type { SessionUser } from "@/platform/entities/user";

type PermissionMethod = "GET" | "POST" | "PUT" | "DELETE";

export type PermissionCheck =
	| { sysname: string }
	| { route: string; method?: PermissionMethod | PermissionMethod[] };

function toArray<T>(v: T | T[]) {
	return Array.isArray(v) ? v : [v];
}

function splitMethods(methods: string): string[] {
	return methods
		.split(":")
		.map((m) => m.trim().toUpperCase())
		.filter(Boolean);
}

function hasRequiredMethods(
	permissionMethods: string,
	required?: PermissionMethod | PermissionMethod[],
): boolean {
	if (!required) return true;

	const allowed = new Set(splitMethods(permissionMethods));

	return toArray(required).some((m) => allowed.has(m.toUpperCase()));
}

export function canRole(
	session: SessionUser | null | undefined,
	roles: string | string[],
): boolean {
	if (!session) return false;

	const current = session.role?.sysname;
	if (!current) return false;

	const required = toArray(roles);
	return required.includes(current);
}

export function canPermission(
	session: SessionUser | null | undefined,
	check: PermissionCheck,
): boolean {
	if (!session) return false;

	const perms = session.permissions ?? [];

	if ("sysname" in check) {
		return perms.some((p) => p.sysname === check.sysname);
	}

	return perms.some((p) => {
		if (p.route !== check.route) return false;
		return hasRequiredMethods(p.methods, check.method);
	});
}
