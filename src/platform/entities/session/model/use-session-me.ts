import { useQuery } from "@tanstack/react-query";

import { sessionMeQueryOptions } from "./session.query";

export function useSessionMe() {
	return useQuery(sessionMeQueryOptions());
}
