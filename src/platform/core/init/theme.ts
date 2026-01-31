import { type Theme, useSettingsStore } from "../state";

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
	setColorScheme(useSettingsStore.getState().theme);

	useSettingsStore.subscribe((state, prev) => {
		if (state.theme !== prev.theme) {
			setColorScheme(state.theme);
		}
	});

	const media = window.matchMedia("(prefers-color-scheme: dark)");
	const onChange = () => {
		if (useSettingsStore.getState().theme === "system") {
			setColorScheme("system");
		}
	};

	media.addEventListener("change", onChange);
};
