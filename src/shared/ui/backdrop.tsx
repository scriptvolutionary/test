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
		<div
			className={cn(
				"absolute inset-0 h-svh pointer-events-none",
				"[-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_0%,transparent_100%)]",
				"[-webkit-mask-repeat:no-repeat]",
				"[-webkit-mask-size:100%_100%]",
			)}
		>
			<div
				className={cn(
					"absolute inset-0",
					"bg-[linear-gradient(90deg,rgb(from_var(--muted)_r_g_b/0.16),rgb(from_var(--muted)_r_g_b/0.42),rgb(from_var(--muted)_r_g_b/0.16))]",
					"animate-[nexus-gradient-xy_3s_ease-in-out_infinite]",
					"[-webkit-mask-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]",
					"[-webkit-mask-size:24px_24px,24px_24px]",
					"[-webkit-mask-repeat:repeat,repeat]",
					"[-webkit-mask-position:0_0,0_0]",
				)}
			/>
		</div>
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
