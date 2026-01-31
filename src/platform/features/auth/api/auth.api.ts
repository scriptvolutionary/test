import { http } from "@/platform/infra/http";

import type { LoginPayload, LoginResponse } from "../model/auth.types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
	const { data } = await http.post<LoginResponse>("/auth", payload);
	return data;
}
