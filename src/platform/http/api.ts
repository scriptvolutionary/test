import axios from 'axios'

import { runtime } from '@/platform/config/runtime'
import { useNexusState } from '@/platform/state/nexus.state'

export const http = axios.create({
	baseURL: runtime.apiUrl,
	withCredentials: true
})

http.interceptors.request.use(config => {
	const key = useNexusState.getState().module

	if (key && config.url) {
		config.url = `/${key}${config.url}`
	}

	return config
})
