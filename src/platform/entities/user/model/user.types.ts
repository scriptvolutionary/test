import type { Permission } from "@/platform/entities/permission";
import type { Region } from "@/platform/entities/region";
import type { Role } from "@/platform/entities/role";
import type { Status } from "@/platform/entities/status";

import type { WithId } from "@/shared/types/base-entities";

export type UserName = {
	lastname: string | null;
	firstname: string | null;
	patronymic: string | null;
};

export type UserBase = WithId & UserName;

export type UserPreview = UserBase & {
	email: string;
};

export type User = UserPreview & {
	telegram_username: string | null;
	phone: string | null;
	created_at: string;

	region: Region | null;
	role: Role;
	status: Status | null;
};

export type SessionUser = User & {
	permissions: Permission[];
};

export type UserCreatePayload = {
	lastname: string | null;
	firstname: string | null;
	patronymic: string | null;
	email: string;
	password: string;
	phone: string | null;
	telegram_username: string | null;

	region_id: number | null;
	role_id: number;
	status_id: number | null;
};

export type UserUpdatePayload = Partial<Omit<UserCreatePayload, "password">> & {
	password?: string;
};
