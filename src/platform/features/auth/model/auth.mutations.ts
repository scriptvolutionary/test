import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sessionKeys } from "@/platform/entities/session";

import { login } from "../api/auth.api";
import { useAuthStore } from "./auth.store";
import type { LoginPayload } from "./auth.types";

export function useLoginMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (payload: LoginPayload) => login(payload),
		onSuccess: (res) => {
			useAuthStore.getState().setToken(res.data.token);
			qc.setQueryData(sessionKeys.me(), res.data.user);
		},
	});
}
