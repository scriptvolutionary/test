import { CircuitBoardIcon } from "lucide-react";
import { lazy, Suspense } from "react";

import { Button } from "@/shared/ui/primitives/button";

import { runtime } from "@/platform/infra/config";

let LazyDevtools: ReturnType<typeof lazy<() => React.JSX.Element>> | null =
	null;

if (import.meta.env.DEV) {
	LazyDevtools = lazy(async () => {
		const [
			{ TanStackDevtools },
			{ ReactQueryDevtoolsPanel },
			{ TanStackRouterDevtoolsPanel },
			{ FormDevtoolsPanel },
		] = await Promise.all([
			import("@tanstack/react-devtools"),
			import("@tanstack/react-query-devtools"),
			import("@tanstack/react-router-devtools"),
			import("@tanstack/react-form-devtools"),
		]);

		function DevtoolsInner() {
			return (
				<TanStackDevtools
					config={{
						customTrigger: () => {
							return (
								<Button
									className="opacity-50 hover:opacity-100"
									variant="ghost"
								>
									<CircuitBoardIcon />
									ПАНЕЛЬ РАЗРАБОТЧИКА
								</Button>
							);
						},
					}}
					plugins={[
						{
							name: "Query",
							render: <ReactQueryDevtoolsPanel />,
							defaultOpen: false,
						},
						{
							name: "Router",
							render: <TanStackRouterDevtoolsPanel />,
							defaultOpen: false,
						},
						{
							name: "Form",
							render: <FormDevtoolsPanel />,
							defaultOpen: false,
						},
					]}
				/>
			);
		}

		return { default: DevtoolsInner };
	});
}

function Devtools() {
	if (!import.meta.env.DEV) return null;

	if (!runtime.debug) return null;

	const Comp = LazyDevtools!;
	return (
		<Suspense fallback={null}>
			<Comp />
		</Suspense>
	);
}

export { Devtools };
