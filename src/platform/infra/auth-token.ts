import Cookies from 'js-cookie'

const TOKEN_COOKIE_KEY = 'nexus:session'

export function getAuthToken(): string | null {
	return Cookies.get(TOKEN_COOKIE_KEY) ?? null
}

export function setAuthToken(token: string): void {
	Cookies.set(TOKEN_COOKIE_KEY, token, {
		sameSite: 'lax',
		secure: import.meta.env.PROD
	})
}

export function clearAuthToken(): void {
	Cookies.remove(TOKEN_COOKIE_KEY)
}
