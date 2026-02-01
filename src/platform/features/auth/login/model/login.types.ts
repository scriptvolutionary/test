import type z from "zod";

import type { ApiResponse } from "@/shared/types/api-response";

import type { SessionUser } from "@/platform/entities/user";

import type { loginSchema } from "./login.schema";

export type LoginFormValues = z.infer<typeof loginSchema>;
export type LoginPayload = LoginFormValues;

export type LoginData = { user: SessionUser; token: string };
export type LoginResponse = ApiResponse<LoginData>;
