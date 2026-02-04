import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import {
	canPermission,
	canRole,
	type PermissionCheck,
	sessionMeQueryOptions,
} from "@/platform/entities/session";

export function useSessionAccess() {
	return useQuery(sessionMeQueryOptions());
}

export function useCanRole(roles: string | string[]) {
	const { data, isLoading } = useSessionAccess();

	const allowed = useMemo(() => canRole(data, roles), [data, roles]);

	return { allowed, isLoading };
}

export function useCanPermission(check: PermissionCheck) {
	const { data, isLoading } = useSessionAccess();

	const allowed = useMemo(() => canPermission(data, check), [data, check]);

	return { allowed, isLoading };
}
