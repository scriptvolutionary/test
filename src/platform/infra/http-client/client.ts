import axios from 'axios'

import { useNexusState } from '@/platform/app/state'

import { runtime } from '../config'

export const baseHttp = axios.create({
	baseURL: runtime.apiUrl,
	withCredentials: true
})
export const http = baseHttp

http.interceptors.request.use(config => {
	const key = useNexusState.getState().module

	if (key && config.url) {
		config.url = `/${key}${config.url}`
	}

	return config
})
