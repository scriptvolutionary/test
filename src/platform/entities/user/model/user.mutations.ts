import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	blockUserById,
	createUser,
	removeUserById,
	unblockUserById,
	updateUserById,
} from "../api/user.api";
import { userKeys } from "./user.keys";
import type { UserCreatePayload, UserUpdatePayload } from "./user.types";

async function invalidateUsersList(qc: ReturnType<typeof useQueryClient>) {
	await qc.invalidateQueries({ queryKey: userKeys.lists() });
}

async function invalidateUserDetail(
	qc: ReturnType<typeof useQueryClient>,
	id: number,
) {
	await qc.invalidateQueries({ queryKey: userKeys.detail(id) });
}

export function useCreateUserMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (payload: UserCreatePayload) => createUser(payload),
		onSuccess: async () => {
			await invalidateUsersList(qc);
		},
	});
}

export function useUpdateUserMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: number; payload: UserUpdatePayload }) =>
			updateUserById(id, payload),
		onSuccess: async (_res, vars) => {
			await Promise.all([
				invalidateUsersList(qc),
				invalidateUserDetail(qc, vars.id),
			]);
		},
	});
}

export function useRemoveUserMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => removeUserById(id),
		onSuccess: async () => {
			await invalidateUsersList(qc);
		},
	});
}

export function useBlockUserMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => blockUserById(id),
		onSuccess: async (_res, id) => {
			await Promise.all([
				invalidateUsersList(qc),
				invalidateUserDetail(qc, id),
			]);
		},
	});
}

export function useUnblockUserMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => unblockUserById(id),
		onSuccess: async (_res, id) => {
			await Promise.all([
				invalidateUsersList(qc),
				invalidateUserDetail(qc, id),
			]);
		},
	});
}
