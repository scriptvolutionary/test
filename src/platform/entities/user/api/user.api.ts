import { buildQueryParams } from "@/shared/api/query-params";
import type { ApiResponse } from "@/shared/types/api-response";
import type { ListParams } from "@/shared/types/list-params";

import { http } from "@/platform/infra/http";

import type {
	User,
	UserCreatePayload,
	UserUpdatePayload,
} from "../model/user.types";

export type UsersListParams = ListParams;

export async function fetchUsers(
	params: UsersListParams = {},
): Promise<ApiResponse<User[]>> {
	const { data } = await http.get<ApiResponse<User[]>>("/users", {
		params: buildQueryParams(params),
	});
	return data;
}

export async function fetchUserById(id: number): Promise<ApiResponse<User>> {
	const { data } = await http.get<ApiResponse<User>>(`/users/${id}`);
	return data;
}

export async function createUser(
	payload: UserCreatePayload,
): Promise<ApiResponse<User>> {
	const { data } = await http.post<ApiResponse<User>>("/users", payload);
	return data;
}

export async function updateUserById(
	id: number,
	payload: UserUpdatePayload,
): Promise<ApiResponse<User>> {
	const { data } = await http.put<ApiResponse<User>>(`/users/${id}`, payload);
	return data;
}

export async function removeUserById(id: number): Promise<ApiResponse<null>> {
	const { data } = await http.delete<ApiResponse<null>>(`/users/${id}`);
	return data;
}

export async function blockUserById(id: number): Promise<ApiResponse<null>> {
	const { data } = await http.get<ApiResponse<null>>(`/users/${id}/block`);
	return data;
}

export async function unblockUserById(id: number): Promise<ApiResponse<null>> {
	const { data } = await http.get<ApiResponse<null>>(`/users/${id}/unblock`);
	return data;
}
