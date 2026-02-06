import { LaptopIcon, type LucideIcon, MoonIcon, SunIcon } from "lucide-react";

import type { Theme } from "@/platform/core/state";

export type ThemeOption = {
	value: Theme;
	label: string;
	icon: LucideIcon;
};

export const themeOptions: ThemeOption[] = [
	{ value: "light", label: "Светлая", icon: SunIcon },
	{ value: "dark", label: "Тёмная", icon: MoonIcon },
	{ value: "system", label: "Системная", icon: LaptopIcon },
];
