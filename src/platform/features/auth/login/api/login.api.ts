import { http } from '@/platform/infra/http'

import type { LoginPayload, LoginResponse } from '../model/login.types'

export async function login(payload: LoginPayload): Promise<LoginResponse> {
	const { data } = await http.post<LoginResponse>('/login', payload)
	return data
}
