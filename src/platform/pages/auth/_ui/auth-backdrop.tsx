import { cn } from "@/shared/lib/utils";

function AuthBackdrop() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			<div
				className={cn(
					"absolute inset-x-0 top-0 h-[65%]",
					"bg-[linear-gradient(to_right,rgb(from_var(--muted)_r_g_b/0.26)_1px,transparent_1px),linear-gradient(to_bottom,rgb(from_var(--muted)_r_g_b/0.26)_1px,transparent_1px)]",
					"bg-size-[24px_24px]",
					"mask-[radial-gradient(ellipse_at_top,black_0%,transparent_75%)]",
					"opacity-100",
				)}
			/>

			<div
				className={cn(
					"absolute left-1/2 top-1/7 size-200 -translate-x-1/2 rounded-full blur-5xl",
					"[background:radial-gradient(circle_at_center,rgb(from_var(--primary)_r_g_b/0.18)_0%,transparent_62%)]",
				)}
				style={{ animation: "nexus-spotlight 14s ease-in-out infinite" }}
			/>

			<div
				className="absolute left-[18%] top-[26%] h-2 w-2 rounded-full"
				style={{
					background: "rgb(from var(--primary) r g b / 0.20)",
					boxShadow: "0 0 18px rgb(from var(--primary) r g b / 0.18)",
					animation: "nexus-float 7s ease-in-out infinite",
				}}
			/>
			<div
				className="absolute right-[22%] top-[30%] h-1.5 w-1.5 rounded-full"
				style={{
					background: "rgb(from var(--foreground) r g b / 0.10)",
					boxShadow: "0 0 14px rgb(from var(--primary) r g b / 0.12)",
					animation: "nexus-float 8.5s ease-in-out infinite",
				}}
			/>
			<div
				className="absolute left-[28%] bottom-[18%] h-2 w-2 rounded-full"
				style={{
					background: "rgb(from var(--foreground) r g b / 0.10)",
					boxShadow: "0 0 16px rgb(from var(--primary) r g b / 0.10)",
					animation: "nexus-float 9.5s ease-in-out infinite",
				}}
			/>
			<div
				className="absolute right-[30%] bottom-[22%] h-1.5 w-1.5 rounded-full"
				style={{
					background: "rgb(from var(--primary) r g b / 0.16)",
					boxShadow: "0 0 14px rgb(from var(--primary) r g b / 0.12)",
					animation: "nexus-float 6.5s ease-in-out infinite",
				}}
			/>
		</div>
	);
}

export { AuthBackdrop };
