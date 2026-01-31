import axios from "axios";

import { runtime } from "../config";
import { clearAuthToken, getAuthToken } from "../token-storage";

export type ModuleResolver = () => string | null;

let moduleResolver: ModuleResolver | null = null;

export const setHttpModuleResolver = (resolver: ModuleResolver | null) => {
	moduleResolver = resolver;
};

export const http = axios.create({
	baseURL: runtime.apiUrl,
	withCredentials: true,
});

export const baseHttp = http;

http.interceptors.request.use((config) => {
	const key = moduleResolver?.();

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
