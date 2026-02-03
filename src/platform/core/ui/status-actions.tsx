import { Link } from "@tanstack/react-router";
import { HomeIcon, MoveLeftIcon } from "lucide-react";

import { Button } from "@/shared/ui/primitives/button";

import { useCurrentModule } from "../hooks";

function StatusActions() {
	const { module } = useCurrentModule();

	return (
		<div className="grid lg:grid-cols-2 w-full gap-2">
			<Button
				className="justify-between"
				variant="outline"
				onClick={() => window.history.back()}
			>
				<MoveLeftIcon /> Назад
			</Button>

			<Button
				className="justify-between"
				nativeButton={false}
				render={
					<Link to={`/platform/m/${module}`}>
						<HomeIcon />
						На главную
					</Link>
				}
			/>
		</div>
	);
}

export { StatusActions };
