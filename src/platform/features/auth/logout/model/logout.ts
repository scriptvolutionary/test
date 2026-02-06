import { useAuthStore } from '@/platform/features/auth/model/auth.store'
import { queryClient } from '@/platform/infra/query'

import { logout as logoutRequest } from '../api/logout.api'

export function logout() {
	const token = useAuthStore.getState().token
	useAuthStore.getState().clearToken()
	queryClient.clear()

	void logoutRequest(token).catch()
}
