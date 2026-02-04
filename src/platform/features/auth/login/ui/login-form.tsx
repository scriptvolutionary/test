/** biome-ignore-all lint/suspicious/noExplicitAny: ignore */
import { useForm } from "@tanstack/react-form";
import * as React from "react";

import { AsyncButton } from "@/shared/ui/async-button";
import { EmailInput } from "@/shared/ui/email-input";
import { PasswordInput } from "@/shared/ui/password-input";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/shared/ui/primitives/field";

import { useLoginMutation } from "../model/login.mutation";
import { loginSchema } from "../model/login.schema";

const FORM = "login-form" as const;

interface Props {
	onSuccess: () => void;
}

function LoginForm({ onSuccess }: Props) {
	const loginMutation = useLoginMutation();
	const isPending = loginMutation.isPending;

	const passwordRef = React.useRef<HTMLInputElement>(null);

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
		<div className="space-y-6">
			<form id={FORM} noValidate onSubmit={onSubmit}>
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
										placeholder="mail@inbox.ru"
										value={field.state.value}
										disabled={isPending}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										enterKeyHint="next"
										aria-invalid={isInvalid}
										onKeyDown={(e) => {
											if (e.key !== "Enter") return;
											e.preventDefault();
											field.handleBlur();
											if (!field.state.value) return;
											passwordRef.current?.focus();
										}}
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
										ref={passwordRef}
										id={field.name}
										name={field.name}
										autoComplete="current-password"
										placeholder="●●●●●●●●"
										value={field.state.value}
										disabled={isPending}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										enterKeyHint="done"
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>
				</FieldGroup>
			</form>
			<Field>
				<AsyncButton form={FORM} isPending={isPending} label="Авторизоваться" />
			</Field>
		</div>
	);
}

export { LoginForm };
