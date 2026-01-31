import { useNavigate, useSearch } from "@tanstack/react-router";

import { LoginForm } from "@/platform/features/auth/login";

export function LoginPageComponent() {
	const navigate = useNavigate();
	const { redirect } = useSearch({ from: "/log-in" });

	return (
		<div className="w-full max-w-sm rounded-lg border bg-card p-6">
			<LoginForm
				onSuccess={() => {
					void navigate({ to: redirect || "/" });
				}}
			/>
		</div>
	);
}
