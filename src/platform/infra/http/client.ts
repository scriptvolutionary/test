import axios from "axios";

import { runtime } from "../config";
import { getHttpConfig } from "./configure";

export const http = axios.create({
	baseURL: runtime.apiUrl,
	timeout: 5_000,
});

http.interceptors.request.use((config) => {
	const { getModuleKey, getToken } = getHttpConfig();

	const key = getModuleKey?.();
	if (key && config.url) {
		config.url = `/${key}${config.url}`;
	}

	const token = getToken?.();
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
			getHttpConfig().onUnauthorized?.();
			window.location.reload();
		}
		return Promise.reject(error);
	},
);
