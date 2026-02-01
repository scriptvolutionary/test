import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sessionKeys } from "@/platform/entities/session";

import { useAuthStore } from "../../model/auth.store";
import { login } from "../api/login.api";
import type { LoginPayload } from "./login.types";

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
