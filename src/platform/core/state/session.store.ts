import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { enabledModuleKeys, type Module } from "@/platform/infra/config";

interface SessionState {
	module: Module;
	setModule: (module: Module) => void;
}

export const useSessionStore = create<SessionState>()(
	persist(
		(set) => ({
			module: enabledModuleKeys[0],
			setModule: (module) => set({ module }),
		}),
		{
			name: "session-store",
			storage: createJSONStorage(() => sessionStorage),
			skipHydration: true,
		},
	),
);
