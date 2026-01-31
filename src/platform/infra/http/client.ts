import axios from "axios";

import { runtime } from "../config";

export const baseHttp = axios.create({
	baseURL: runtime.apiUrl,
	withCredentials: true,
});
