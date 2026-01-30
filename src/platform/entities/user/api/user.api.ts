import { http } from "@/platform/app/http";

import type { ApiResponse } from "@/shared/types/api";

import type {
	User,
	UserCreatePayload,
	UserUpdatePayload,
} from "../model/user.types";

export async function getUser(id: number): Promise<ApiResponse<User>> {
	const { data } = await http.get<ApiResponse<User>>(`/users/${id}`);
	return data;
}

export async function createUser(
	payload: UserCreatePayload,
): Promise<ApiResponse<User>> {
	const { data } = await http.post<ApiResponse<User>>("/users", payload);
	return data;
}

export async function updateUser(
	id: number,
	payload: UserUpdatePayload,
): Promise<ApiResponse<User>> {
	const { data } = await http.put<ApiResponse<User>>(`/users/${id}`, payload);
	return data;
}

export async function deleteUser(id: number): Promise<ApiResponse<null>> {
	const { data } = await http.delete<ApiResponse<null>>(`/users/${id}`);
	return data;
}

export async function blockUser(id: number): Promise<ApiResponse<null>> {
	const { data } = await http.get<ApiResponse<null>>(`/users/${id}/block`);
	return data;
}

export async function unblockUser(id: number): Promise<ApiResponse<null>> {
	const { data } = await http.get<ApiResponse<null>>(`/users/${id}/unblock`);
	return data;
}
