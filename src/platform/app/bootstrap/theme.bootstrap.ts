import { useNexusState } from "../state";

export const applyTheme = (theme: "light" | "dark" | "system") => {
	const root = document.documentElement;
	const resolved =
		theme === "system"
			? window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light"
			: theme;

	root.setAttribute("data-theme", resolved);
};

export const bootstrapTheme = () => {
	applyTheme(useNexusState.getState().theme);

	useNexusState.subscribe((state, prev) => {
		if (state.theme !== prev.theme) {
			applyTheme(state.theme);
		}
	});

	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", () => {
			if (useNexusState.getState().theme === "system") {
				applyTheme("system");
			}
		});
};
