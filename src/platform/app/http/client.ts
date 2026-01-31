import { useAppStore } from "@/platform/app/state";
import { clearAuthToken, getAuthToken } from "@/platform/infra/auth-token";
import { baseHttp } from "@/platform/infra/http";

export const http = baseHttp;

http.interceptors.request.use((config) => {
	const key = useAppStore.getState().module;

	if (key && config.url) {
		config.url = `/${key}${config.url}`;
	}

	return config;
});

http.interceptors.request.use((config) => {
	const token = getAuthToken();
	if (token) {
		config.headers = config.headers ?? {};
		if (!("Authorization" in config.headers)) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}
	return config;
});

http.interceptors.response.use(
	(res) => res,
	(error) => {
		if (error?.response?.status === 401) {
			clearAuthToken();
		}
		return Promise.reject(error);
	},
);
