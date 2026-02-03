import { useLocation, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";

// import { getAppVersion } from '@/shared/lib/app'
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/primitives/button";

import { ModuleFeedbackButton } from "@/platform/core/ui/module-feedback-button";

// function NotFoundPageComponent() {
// 	const location = useLocation();

// 	return (
// 		<StatusPageShell
// 			icon={<BadgeAlertIcon />}
// 			title="404 - Не найдено"
// 			description={
// 				<>
// 					Страница по пути{" "}
// 					<Kbd className="text-muted-foreground break-all">
// 						{location.pathname}
// 					</Kbd>{" "}
// 					не существует.
// 				</>
// 			}
// 			actions={
// 				<StatusActions
// 					feedbackButton={
// 						<ModuleFeedbackButton
// 							url={location.href}
// 							report={{
// 								code: 404,
// 								title: "Произошла ошибка при открытии страницы.",
// 							}}
// 						/>
// 					}
// 				/>
// 			}
// 		/>
// 	);
// }

// export { NotFoundPageComponent };

export function NotFoundPageComponent() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div className="relative min-h-dvh overflow-hidden">
			<DashboardBackdrop />

			<div className="relative mx-auto flex min-h-dvh container flex-col px-12">
				<header className="flex items-center justify-between py-6">
					<div className="flex items-center gap-2">
						<div className="grid place-items-center">
							<img
								className="size-8 opacity-80"
								src="/nexus_t_512x512.png"
								alt="Nexus"
							/>
						</div>
						<div className="leading-tight">
							<div className="text-sm font-semibold">Nexus</div>
							<div className="text-xs text-muted-foreground">
								Модульная платформа
							</div>
						</div>
					</div>

					{/* {headerAction ?? (
						<ModuleFeedbackButton
							variant="ghost"
							url={location.href}
							report={{ code: 0, title: 'У меня есть вопрос...' }}
						/>
					)} */}
				</header>

				<main className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm animate-in ease-in-out zoom-in-90 fade-in-15 slide-in-from-bottom-5 duration-300 space-y-6">
						<div className="text-center space-y-6">
							<div className="inline-flex items-center gap-2 rounded-full border bg-background/25 px-3 py-1 text-xs text-muted-foreground">
								<span className="font-medium text-foreground/80">404</span>
								<span className="opacity-70">·</span>
								<span className="opacity-90">Not Found</span>
							</div>

							<div>
								<p className="text-base leading-snug font-medium">
									Страница не найдена
								</p>
								<p className="text-muted-foreground text-sm">
									Ссылка невалидна или страница была перемещена.
								</p>
							</div>
						</div>

						<div className="space-y-5 px-6">
							<div className="grid gap-2 sm:grid-cols-2">
								<Button
									variant="outline"
									className="gap-2"
									onClick={() => window.history.back()}
								>
									<ArrowLeft className="size-4" />
									Вернутся назад
								</Button>

								<Button
									className="gap-2"
									// onClick={() => navigate({ to: '/platform' })}
								>
									<Home className="size-4" />
									На главную
								</Button>
							</div>

							<div className="rounded-lg border bg-background/25 px-3 py-2 text-xs text-muted-foreground">
								<span className="opacity-80">URL: </span>
								<span className="font-mono text-foreground/75">
									{location.pathname}
								</span>
							</div>
						</div>
					</div>
				</main>

				<footer className="pb-8 text-center text-xs text-muted-foreground">
					<span>ООО "Ревелк" © 2026</span>
					<span className="mx-2">·</span>
					{/* <span>Версия: {version}</span> */}
				</footer>
			</div>
		</div>
	);
}

function DashboardBackdrop() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			<div
				className={cn(
					"absolute inset-0",
					"[background:radial-gradient(1200px_circle_at_15%_10%,rgb(from_var(--primary)_r_g_b/0.10)_0%,transparent_55%),radial-gradient(900px_circle_at_80%_35%,rgb(from_var(--foreground)_r_g_b/0.06)_0%,transparent_58%),linear-gradient(135deg,rgb(from_var(--muted)_r_g_b/0.20),transparent_55%)]",
				)}
			/>

			<div className="absolute inset-0 opacity-60">
				<div
					className={cn(
						"absolute -left-1/4 top-[18%] h-[1px] w-[140%]",
						"bg-gradient-to-r from-transparent via-foreground/20 to-transparent",
						"blur-[0.2px]",
					)}
					style={{ animation: "nexus-stream 10s ease-in-out infinite" }}
				/>
				<div
					className={cn(
						"absolute -left-1/4 top-[38%] h-[1px] w-[140%]",
						"bg-gradient-to-r from-transparent via-primary/18 to-transparent",
						"blur-[0.2px]",
					)}
					style={{ animation: "nexus-stream 12s ease-in-out infinite reverse" }}
				/>
				<div
					className={cn(
						"absolute -left-1/4 top-[58%] h-[1px] w-[140%]",
						"bg-gradient-to-r from-transparent via-foreground/16 to-transparent",
						"blur-[0.2px]",
					)}
					style={{ animation: "nexus-stream 14s ease-in-out infinite" }}
				/>
			</div>

			{/* floating blobs */}
			<div
				className={cn(
					"absolute left-[12%] top-[22%] size-[520px] -translate-x-1/4 rounded-full blur-3xl",
					"[background:radial-gradient(circle_at_center,rgb(from_var(--primary)_r_g_b/0.14)_0%,transparent_60%)]",
				)}
				style={{ animation: "nexus-drift 16s ease-in-out infinite" }}
			/>
			<div
				className={cn(
					"absolute right-[8%] bottom-[12%] size-[560px] translate-x-1/4 rounded-full blur-3xl",
					"[background:radial-gradient(circle_at_center,rgb(from_var(--foreground)_r_g_b/0.08)_0%,transparent_62%)]",
				)}
				style={{ animation: "nexus-drift 18s ease-in-out infinite reverse" }}
			/>

			{/* subtle noise dots */}
			<div
				className="absolute left-[22%] top-[64%] h-1.5 w-1.5 rounded-full"
				style={{
					background: "rgb(from var(--primary) r g b / 0.18)",
					boxShadow: "0 0 16px rgb(from var(--primary) r g b / 0.10)",
					animation: "nexus-float 8.5s ease-in-out infinite",
				}}
			/>
			<div
				className="absolute right-[26%] top-[26%] h-2 w-2 rounded-full"
				style={{
					background: "rgb(from var(--foreground) r g b / 0.10)",
					boxShadow: "0 0 14px rgb(from var(--primary) r g b / 0.10)",
					animation: "nexus-float 7.5s ease-in-out infinite",
				}}
			/>

			<style>{`
        @keyframes nexus-stream {
          0%   { transform: translateX(-2%) skewX(-12deg); opacity: .35; }
          50%  { transform: translateX(2%)  skewX(-12deg); opacity: .75; }
          100% { transform: translateX(-2%) skewX(-12deg); opacity: .35; }
        }

        @keyframes nexus-drift {
          0%   { transform: translate3d(0,0,0); opacity: .9; }
          50%  { transform: translate3d(18px,-12px,0); opacity: 1; }
          100% { transform: translate3d(0,0,0); opacity: .9; }
        }

        /* если у тебя уже есть nexus-float — можно удалить этот keyframes */
        @keyframes nexus-float {
          0%, 100% { transform: translate3d(0,0,0); opacity: .7; }
          50% { transform: translate3d(0,-10px,0); opacity: 1; }
        }
      `}</style>
		</div>
	);
}
