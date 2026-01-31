import type { SessionUser } from "@/platform/entities/user";

import type { ApiResponse } from "@/shared/types/api-response";

export type LoginPayload = { email: string; password: string };

export type LoginData = { user: SessionUser; token: string };

export type LoginResponse = ApiResponse<LoginData>;
