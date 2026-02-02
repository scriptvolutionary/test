import { useNavigate, useSearch } from "@tanstack/react-router";

import { LoginForm } from "@/platform/features/auth/login/ui/login-form";
import { AuthPageShell } from "@/platform/pages/auth/ui";

export function LoginPageComponent() {
	const navigate = useNavigate();
	const search = useSearch({ from: "/log-in" });

	return (
		<AuthPageShell
			title="Вход в систему"
			description="Авторизуйтесь чтобы получить доступ."
		>
			<LoginForm
				onSuccess={() => navigate({ to: search.redirect ?? "/platform" })}
			/>
		</AuthPageShell>
	);
}
