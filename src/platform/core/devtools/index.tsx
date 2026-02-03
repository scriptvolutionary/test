import { CircuitBoardIcon } from "lucide-react";
import { lazy, Suspense } from "react";

import { Button } from "@/shared/ui/primitives/button";

import { runtime } from "@/platform/infra/config";

const LazyDevtools = lazy(async () => {
	const [
		{ TanStackDevtools },
		{ ReactQueryDevtoolsPanel },
		{ TanStackRouterDevtoolsPanel },
	] = await Promise.all([
		import("@tanstack/react-devtools"),
		import("@tanstack/react-query-devtools"),
		import("@tanstack/react-router-devtools"),
	]);

	function DevtoolsInner() {
		return (
			<TanStackDevtools
				config={{
					customTrigger: () => {
						return (
							<Button className="opacity-50 hover:opacity-100" variant="ghost">
								<CircuitBoardIcon />
								ПАНЕЛЬ РАЗРАБОТЧИКА
							</Button>
						);
					},
				}}
				plugins={[
					{
						name: "TanStack Query",
						render: <ReactQueryDevtoolsPanel />,
						defaultOpen: false,
					},
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
						defaultOpen: false,
					},
				]}
			/>
		);
	}

	return { default: DevtoolsInner };
});

function Devtools() {
	if (!runtime.debug) return null;

	return (
		<Suspense fallback={null}>
			<LazyDevtools />
		</Suspense>
	);
}

export { Devtools };
