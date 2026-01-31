import type { ApiResponse } from "@/shared/types/api-response";

import type { SessionUser } from "@/platform/entities/user";
import { http } from "@/platform/infra/http";

export async function fetchSession(): Promise<ApiResponse<SessionUser>> {
	const { data } = await http.get<ApiResponse<SessionUser>>("/session");
	return data;
}
