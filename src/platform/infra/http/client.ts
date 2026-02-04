import axios from "axios";

import { runtime } from "../config";
import { getHttpConfig } from "./configure";

let handling401 = false;
let handling403 = false;

export function resetHttpAuthHandling() {
	handling401 = false;
	handling403 = false;
}

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
		const status = error?.response?.status;

		if (status === 401) {
			if (!handling401) {
				handling401 = true;

				getHttpConfig().onUnauthorized?.();

				handling401 = false;
			}
		}

		if (status === 403) {
			const path = window.location.pathname;
			const alreadyOnForbidden = path.startsWith("/forbidden");
			const alreadyOnLogin = path.startsWith("/log-in");

			if (!alreadyOnForbidden && !alreadyOnLogin && !handling403) {
				handling403 = true;

				getHttpConfig().onForbidden?.();

				handling403 = false;
			}
		}

		return Promise.reject(error);
	},
);
