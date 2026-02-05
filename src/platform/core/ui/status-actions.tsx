import { Link } from "@tanstack/react-router";
import { HomeIcon, MoveLeftIcon } from "lucide-react";

import { Button } from "@/shared/ui/primitives/button";

function StatusActions() {
	return (
		<div className="grid grid-cols-2 w-full gap-2">
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
					<Link to={`/platform`}>
						<HomeIcon />
						На главную
					</Link>
				}
			/>
		</div>
	);
}

export { StatusActions };
