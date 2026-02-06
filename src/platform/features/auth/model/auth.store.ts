import { create } from 'zustand'

import { clearAuthToken, getAuthToken, setAuthToken } from '@/platform/infra/auth-token'

type AuthState = {
	token: string | null
	hydrated: boolean

	hydrate: () => void
	setToken: (token: string) => void
	clearToken: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
	token: null,
	hydrated: false,

	hydrate: () => {
		if (get().hydrated) return
		set({ token: getAuthToken(), hydrated: true })
	},

	setToken: (token) => {
		setAuthToken(token)
		set({ token, hydrated: true })
	},

	clearToken: () => {
		clearAuthToken()
		set({ token: null, hydrated: true })
	}
}))
