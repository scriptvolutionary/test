/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { useForm } from "@tanstack/react-form";
import * as React from "react";

import { EmailInput } from "@/shared/ui/email-input";
import { PasswordInput } from "@/shared/ui/password-input";
import { Button } from "@/shared/ui/primitives/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/shared/ui/primitives/field";
import { Spinner } from "@/shared/ui/primitives/spinner";

import { useLoginMutation } from "../model/login.mutation";
import { loginSchema } from "../model/login.schema";

const FORM_ID = "two-step-login-form" as const;

interface Props {
	onSuccess: () => void;
}

function LoginForm({ onSuccess }: Props) {
	const loginMutation = useLoginMutation();
	const isPending = loginMutation.isPending;

	const form = useForm({
		defaultValues: { email: "", password: "" },
		validators: { onSubmit: loginSchema },
		onSubmit: async ({ value }) => {
			await loginMutation.mutateAsync(value);
			onSuccess?.();
		},
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isPending) return;

		form.handleSubmit();
	};

	return (
		<div className="space-y-5">
			<form id={FORM_ID} noValidate onSubmit={onSubmit}>
				<FieldGroup>
					<form.Field name="email">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;

							return (
								<Field>
									<FieldLabel>Электронная почта</FieldLabel>
									<EmailInput
										autoFocus
										id={field.name}
										name={field.name}
										placeholder="name@company.ru"
										value={field.state.value}
										disabled={isPending}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>
					<form.Field name="password">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;

							return (
								<Field>
									<FieldLabel>Пароль</FieldLabel>
									<PasswordInput
										id={field.name}
										name={field.name}
										autoComplete="current-password"
										placeholder="••••••••"
										value={field.state.value}
										disabled={isPending}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>
				</FieldGroup>
			</form>
			<Button
				className="w-full"
				type="submit"
				size="lg"
				form={FORM_ID}
				disabled={isPending}
			>
				{isPending ? (
					<>
						<Spinner className="size-4 animate-spin" />
						Входим…
					</>
				) : (
					"Авторизоваться"
				)}
			</Button>
		</div>
	);
}

export { LoginForm };
