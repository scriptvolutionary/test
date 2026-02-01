import * as z from "zod";

export const emailSchema = z
	.string()
	.trim()
	.min(1, "Обязательное поле.")
	.email("Электронная почта невалидна.");

export const passwordSchema = z
	.string()
	.min(1, "Обязательное поле.")
	.min(8, "Пароль не может быть короче 8 символов.");

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});
