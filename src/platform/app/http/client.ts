import { useNexusState } from "@/platform/app/state";
import { baseHttp } from "@/platform/infra/http-client";

export const http = baseHttp;

http.interceptors.request.use((config) => {
	const key = useNexusState.getState().module;

	if (key && config.url) {
		config.url = `/${key}${config.url}`;
	}

	return config;
});
