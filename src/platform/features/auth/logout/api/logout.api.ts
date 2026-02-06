import { http } from '@/platform/infra/http'

import type { LogoutResponse } from '../model/logout.types'

export async function logout(token?: string | null): Promise<LogoutResponse> {
	const { data } = await http.get<LogoutResponse>('/logout', {
		headers: token ? { Authorization: `Bearer ${token}` } : undefined,
		validateStatus: () => true
	})

	return data
}
