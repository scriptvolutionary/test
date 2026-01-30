import { type Theme, useAppStore } from "../state";

export const setColorScheme = (theme: Theme) => {
	const root = document.documentElement;
	const resolved =
		theme === "system"
			? window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light"
			: theme;

	root.setAttribute("data-theme", resolved);
};

export const initThemeSync = () => {
	setColorScheme(useAppStore.getState().theme);

	useAppStore.subscribe((state, prev) => {
		if (state.theme !== prev.theme) {
			setColorScheme(state.theme);
		}
	});

	const media = window.matchMedia("(prefers-color-scheme: dark)");
	const onChange = () => {
		if (useAppStore.getState().theme === "system") {
			setColorScheme("system");
		}
	};

	media.addEventListener("change", onChange);
};
