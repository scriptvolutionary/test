import { useNavigate, useSearch } from "@tanstack/react-router";

import { Card, CardContent } from "@/shared/ui/primitives/card";

import { TwoStepLoginForm } from "@/platform/features/auth";

export function LoginPageComponent() {
	const navigate = useNavigate();
	const search = useSearch({ from: "/log-in" });

	const redirectTo = search.redirect ?? "/platform";

	return (
		<div className="flex min-h-svh flex-col items-center justify-start gap-6 p-6 md:p-10">
			<div className="w-full max-w-sm mt-44">
				<Card className="py-6">
					<CardContent className="px-6">
						<TwoStepLoginForm
							onSuccess={() => {
								navigate({ to: redirectTo });
							}}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
