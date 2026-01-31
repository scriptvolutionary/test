import { Link } from "@tanstack/react-router";
import { LayoutDashboardIcon } from "lucide-react";

import { Button } from "@/shared/ui/primitives/button";

interface Props {
	showDashboard?: boolean;
	dashboardTo?: string;
	extra?: React.ReactNode;
	feedbackButton?: React.ReactNode;
}

function StatusActions({
	showDashboard = true,
	dashboardTo = "/",
	extra,
	feedbackButton,
}: Props) {
	return (
		<>
			{showDashboard ? (
				<Button
					render={
						<Link className="inline-flex items-center gap-2" to={dashboardTo}>
							<LayoutDashboardIcon />В дашборд
						</Link>
					}
				/>
			) : null}

			{extra}
			{feedbackButton}
		</>
	);
}

export { StatusActions };
