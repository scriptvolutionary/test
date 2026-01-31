import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Button } from "@/shared/ui/primitives/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/shared/ui/primitives/field";
import { Input } from "@/shared/ui/primitives/input";

import { useLoginMutation } from "../model/auth.mutations";

const formSchema = z.object({
	email: z.email("Введите корректный email"),
	password: z.string().min(1, "Введите пароль"),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
	const login = useLoginMutation();

	const form = useForm({
		defaultValues: { email: "", password: "" } as FormValues,
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			await new Promise<void>((resolve, reject) => {
				login.mutate(value, {
					onSuccess: () => {
						onSuccess?.();
						resolve();
					},
					onError: () => reject(),
				});
			});
		},
	});

	return (
		<form
			noValidate
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit();
			}}
			className="grid gap-4"
		>
			<FieldGroup>
				<form.Field
					name="email"
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="email"
									autoComplete="username"
									placeholder="name@company.com"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
								/>
								<FieldDescription>
									Введите email, указанный в системе.
								</FieldDescription>
								{isInvalid ? (
									<FieldError errors={field.state.meta.errors} />
								) : null}
							</Field>
						);
					}}
				/>

				<form.Field
					name="password"
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="password"
									autoComplete="current-password"
									placeholder="••••••••"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
								/>
								{isInvalid ? (
									<FieldError errors={field.state.meta.errors} />
								) : null}
							</Field>
						);
					}}
				/>
			</FieldGroup>

			{login.isError ? (
				<div className="text-sm text-destructive">
					Не удалось войти. Проверьте данные и попробуйте снова.
				</div>
			) : null}

			<div className="flex items-center gap-2">
				<Button type="submit" disabled={login.isPending}>
					{login.isPending ? "Входим…" : "Войти"}
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={() => form.reset()}
					disabled={login.isPending}
				>
					Сбросить
				</Button>
			</div>
		</form>
	);
}
