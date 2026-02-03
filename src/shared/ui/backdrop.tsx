import { cn } from "@/shared/lib/utils";

type Mode = "public" | "protected";

interface BackdropProps {
	mode?: Mode;
	className?: string;
}

function Backdrop({ mode = "public", className }: BackdropProps) {
	return (
		<div
			className={cn(
				"pointer-events-none absolute inset-0 overflow-hidden",
				className,
			)}
		>
			{mode === "public" ? <PublicLayer /> : <ProtectedLayer />}
		</div>
	);
}
export { Backdrop };

function PublicLayer() {
	return (
		<>
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

			<Dot
				className="left-[18%] top-[26%] h-2 w-2"
				bg="rgb(from var(--primary) r g b / 0.20)"
				shadow="0 0 18px rgb(from var(--primary) r g b / 0.18)"
				anim="nexus-float 7s ease-in-out infinite"
			/>
			<Dot
				className="right-[22%] top-[30%] h-1.5 w-1.5"
				bg="rgb(from var(--foreground) r g b / 0.10)"
				shadow="0 0 14px rgb(from var(--primary) r g b / 0.12)"
				anim="nexus-float 8.5s ease-in-out infinite"
			/>
			<Dot
				className="left-[28%] bottom-[18%] h-2 w-2"
				bg="rgb(from var(--foreground) r g b / 0.10)"
				shadow="0 0 16px rgb(from var(--primary) r g b / 0.10)"
				anim="nexus-float 9.5s ease-in-out infinite"
			/>
			<Dot
				className="right-[30%] bottom-[22%] h-1.5 w-1.5"
				bg="rgb(from var(--primary) r g b / 0.16)"
				shadow="0 0 14px rgb(from var(--primary) r g b / 0.12)"
				anim="nexus-float 6.5s ease-in-out infinite"
			/>
		</>
	);
}

function ProtectedLayer() {
	return (
		<>
			<div
				className={cn(
					"absolute inset-0",
					"[background:radial-gradient(1200px_circle_at_15%_10%,rgb(from_var(--primary)_r_g_b/0.10)_0%,transparent_55%),radial-gradient(900px_circle_at_80%_35%,rgb(from_var(--foreground)_r_g_b/0.06)_0%,transparent_58%),linear-gradient(135deg,rgb(from_var(--muted)_r_g_b/0.20),transparent_55%)]",
				)}
			/>

			<div className="absolute inset-0 opacity-60">
				<div
					className={cn(
						"absolute -left-1/4 top-[18%] h-px w-[140%]",
						"bg-linear-to-r from-transparent via-foreground/20 to-transparent",
						"blur-[0.2px]",
					)}
					style={{ animation: "nexus-stream 10s ease-in-out infinite" }}
				/>
				<div
					className={cn(
						"absolute -left-1/4 top-[38%] h-px w-[140%]",
						"bg-linear-to-r from-transparent via-primary/18 to-transparent",
						"blur-[0.2px]",
					)}
					style={{ animation: "nexus-stream 12s ease-in-out infinite reverse" }}
				/>
				<div
					className={cn(
						"absolute -left-1/4 top-[58%] h-px w-[140%]",
						"bg-linear-to-r from-transparent via-foreground/16 to-transparent",
						"blur-[0.2px]",
					)}
					style={{ animation: "nexus-stream 14s ease-in-out infinite" }}
				/>
			</div>

			<div
				className={cn(
					"absolute left-[12%] top-[22%] size-130 -translate-x-1/4 rounded-full blur-3xl",
					"[background:radial-gradient(circle_at_center,rgb(from_var(--primary)_r_g_b/0.14)_0%,transparent_60%)]",
				)}
				style={{ animation: "nexus-drift 16s ease-in-out infinite" }}
			/>
			<div
				className={cn(
					"absolute right-[8%] bottom-[12%] size-140 translate-x-1/4 rounded-full blur-3xl",
					"[background:radial-gradient(circle_at_center,rgb(from_var(--foreground)_r_g_b/0.08)_0%,transparent_62%)]",
				)}
				style={{ animation: "nexus-drift 18s ease-in-out infinite reverse" }}
			/>

			<Dot
				className="left-[22%] top-[64%] h-1.5 w-1.5"
				bg="rgb(from var(--primary) r g b / 0.18)"
				shadow="0 0 16px rgb(from var(--primary) r g b / 0.10)"
				anim="nexus-float 8.5s ease-in-out infinite"
			/>
			<Dot
				className="right-[26%] top-[26%] h-2 w-2"
				bg="rgb(from var(--foreground) r g b / 0.10)"
				shadow="0 0 14px rgb(from var(--primary) r g b / 0.10)"
				anim="nexus-float 7.5s ease-in-out infinite"
			/>
		</>
	);
}

interface DotProps {
	className: string;
	bg: string;
	shadow: string;
	anim: string;
}

function Dot({ className, bg, shadow, anim }: DotProps) {
	return (
		<div
			className={cn("absolute rounded-full", className)}
			style={{ background: bg, boxShadow: shadow, animation: anim }}
		/>
	);
}
