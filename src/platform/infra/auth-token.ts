const TOKEN_COOKIE = "nexus_token";

function setCookie(name: string, value: string, days = 7) {
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie =
		`${encodeURIComponent(name)}=${encodeURIComponent(value)}; ` +
		`Expires=${expires}; Path=/; SameSite=Lax; Secure;`;
}

function getCookie(name: string): string | null {
	const key = `${encodeURIComponent(name)}=`;
	for (const part of document.cookie.split("; ")) {
		if (part.startsWith(key)) return decodeURIComponent(part.slice(key.length));
	}
	return null;
}

function deleteCookie(name: string) {
	document.cookie = `${encodeURIComponent(name)}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax; Secure;`;
}

export function getAuthToken() {
	if (typeof document === "undefined") return null;
	return getCookie(TOKEN_COOKIE);
}

export function setAuthToken(token: string) {
	setCookie(TOKEN_COOKIE, token, 7);
}

export function clearAuthToken() {
	deleteCookie(TOKEN_COOKIE);
}
