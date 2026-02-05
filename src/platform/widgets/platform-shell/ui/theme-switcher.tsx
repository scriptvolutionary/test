import type { LucideIcon } from "lucide-react";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/primitives/button";

import type { Theme } from "@/platform/core/state";
import { useTheme } from "@/platform/sdk/hooks";

const themes: Array<{
	value: Theme;
	label: string;
	icon: LucideIcon;
}> = [
	{ value: "light", label: "???????", icon: SunIcon },
	{ value: "dark", label: "??????", icon: MoonIcon },
	{ value: "system", label: "?????????", icon: LaptopIcon },
];

function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="inline-flex items-center rounded-md border p-0.5">
			{themes.map((item) => {
				const active = item.value === theme;
				const Icon = item.icon;

				return (
					<Button
						key={item.value}
						variant="ghost"
						size="icon-xs"
						className={cn(active && "bg-muted text-foreground")}
						aria-pressed={active}
						title={item.label}
						onClick={() => setTheme(item.value)}
					>
						<Icon />
						<span className="sr-only">{item.label}</span>
					</Button>
				);
			})}
		</div>
	);
}

export { ThemeSwitcher };
