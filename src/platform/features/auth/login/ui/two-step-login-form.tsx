/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { useForm, useStore } from "@tanstack/react-form";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import * as React from "react";

import { EmailInput } from "@/shared/ui/email-input";
import { PasswordInput } from "@/shared/ui/password-input";
import { Button } from "@/shared/ui/primitives/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from "@/shared/ui/primitives/field";
import { Spinner } from "@/shared/ui/primitives/spinner";

import { useLoginMutation } from "../model/login.mutation";
import {
	emailSchema,
	loginSchema,
	passwordSchema,
} from "../model/login.schema";

const FORM_ID = "two-step-login-form" as const;

interface Props {
	onSuccess: () => void;
}

function TwoStepLoginForm({ onSuccess }: Props) {
	const [step, setStep] = React.useState<"email" | "password">("email");
	const isEmailStep = step === "email";

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

	const emailValue = useStore(form.store, (s) => (s.values.email ?? "").trim());
	const passwordValue = useStore(form.store, (s) => s.values.password ?? "");

	const validateEmail = () => emailSchema.safeParse(emailValue).success;
	const validatePassword = () =>
		passwordSchema.safeParse(passwordValue).success;

	const backToEmail = () => setStep("email");

	const canContinue = validateEmail();
	const canSubmit = validatePassword();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isPending) return;

		const emailOk = validateEmail();
		if (!emailOk) {
			setStep("email");
			return;
		}

		if (isEmailStep) {
			setStep("password");
			return;
		}

		const passOk = validatePassword();
		if (!passOk) {
			return;
		}

		form.handleSubmit();
	};

	return (
		<form id={FORM_ID} noValidate onSubmit={onSubmit}>
			<FieldGroup>
				<FieldSet>
					<FieldLegend>
						{isEmailStep ? "С возвращением!" : "Введите пароль"}
					</FieldLegend>
					{isEmailStep ? (
						<FieldDescription>Введите электронную почту</FieldDescription>
					) : (
						<FieldDescription>
							<button
								type="button"
								onClick={backToEmail}
								className="inline-flex items-center gap-2  text-muted-foreground hover:text-foreground transition-colors"
							>
								<ArrowLeftIcon className="size-4" />
								<span className="underline underline-offset-4">
									{emailValue}
								</span>
							</button>
						</FieldDescription>
					)}

					<FieldGroup key={step}>
						{isEmailStep ? (
							<form.Field name="email">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;

									return (
										<Field>
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

											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
						) : (
							<form.Field name="password">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;

									return (
										<Field>
											<PasswordInput
												autoFocus
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

											{isInvalid ? (
												<FieldError errors={field.state.meta.errors} />
											) : null}
										</Field>
									);
								}}
							</form.Field>
						)}
					</FieldGroup>
				</FieldSet>
				<Field orientation="horizontal" className="justify-end">
					<Button
						type="submit"
						form={FORM_ID}
						disabled={isPending || (isEmailStep ? !canContinue : !canSubmit)}
					>
						{isPending ? (
							<>
								<Spinner className="size-4 animate-spin" />
								Входим…
							</>
						) : isEmailStep ? (
							<>
								Дальше <ArrowRightIcon className="size-4" />
							</>
						) : (
							"Авторизоваться"
						)}
					</Button>
				</Field>
			</FieldGroup>
		</form>
	);
}

export { TwoStepLoginForm };
