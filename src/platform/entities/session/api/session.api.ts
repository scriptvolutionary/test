import { http } from "@/platform/app/http";
import type { SessionUser } from "@/platform/entities/user";

import type { ApiResponse } from "@/shared/types/api-response";

export async function fetchSession(): Promise<ApiResponse<SessionUser>> {
	const { data } = await http.get<ApiResponse<SessionUser>>("/session");
	return data;
}
