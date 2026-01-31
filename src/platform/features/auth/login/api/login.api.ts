import { http } from "@/platform/app/http";

import type { LoginPayload, LoginResponse } from "../model/login.types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
	const { data } = await http.post<LoginResponse>("/auth", payload);
	return data;
}
