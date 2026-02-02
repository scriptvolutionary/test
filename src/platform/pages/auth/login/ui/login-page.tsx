import { useNavigate, useSearch } from "@tanstack/react-router";

import { LoginForm } from "@/platform/features/auth/login/ui/login-form";
import { AuthPageShell } from "@/platform/pages/auth/_ui";

export function LoginPageComponent() {
	const navigate = useNavigate();
	const search = useSearch({ from: "/log-in" });

	return (
		<AuthPageShell
			title="Получите доступ"
			description="Войдите в свою учетную запись используя электронную почту и пароль"
		>
			<LoginForm
				onSuccess={() => navigate({ to: search.redirect ?? "/platform" })}
			/>
		</AuthPageShell>
	);
}
