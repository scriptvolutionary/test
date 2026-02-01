/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

import type { AxiosError } from "axios";
import axios from "axios";

import type { ApiMetadataError } from "@/shared/types/api-response";

type ToastPayload = {
	message: string;
	description?: string;
};

function isObject(v: unknown): v is Record<string, unknown> {
	return typeof v === "object" && v !== null;
}

function pickString(v: unknown): string | undefined {
	return typeof v === "string" && v.trim() ? v : undefined;
}

export function getApiMetadata(error: unknown): ApiMetadataError | null {
	if (!error) return null;

	const axiosError = error as AxiosError<unknown>;
	const data = axiosError?.response?.data;

	if (!isObject(data)) return null;

	const metadata = (data as Record<string, unknown>).metadata;
	if (!isObject(metadata)) return null;

	return metadata as ApiMetadataError;
}

export function getToastPayload(error: unknown): ToastPayload {
	if (error instanceof DOMException && error.name === "AbortError") {
		return { message: "" };
	}

	if (axios.isAxiosError(error)) {
		const e = error as AxiosError<unknown>;

		const md = getApiMetadata(e);
		if (md?.message) {
			return {
				message: String(md.message),
				description: pickString(md.reason) ?? pickString(md.solution),
			};
		}

		if (!e.response) {
			if (e.code === "ECONNABORTED") {
				return {
					message: "Превышено время ожидания",
					description: "Проверьте соединение и попробуйте снова.",
				};
			}

			return {
				message: "Нет соединения с сервером",
				description: "Проверьте интернет или доступность сервиса.",
			};
		}

		const status = e.response.status;
		switch (status) {
			case 400:
				return {
					message: "Некорректный запрос",
					description: "Проверьте введённые данные.",
				};
			case 403:
				return { message: "Доступ запрещён" };
			case 404:
				return { message: "Ресурс не найден" };
			case 409:
				return {
					message: "Конфликт данных",
					description: "Попробуйте обновить страницу.",
				};
			case 429:
				return {
					message: "Слишком много запросов",
					description: "Повторите попытку позже.",
				};
			case 500:
			case 502:
			case 503:
			case 504:
				return {
					message: "Ошибка сервера",
					description: `Код: ${status}. Попробуйте позже.`,
				};
			default:
				return { message: `Ошибка ${status}` };
		}
	}

	if (isObject(error) && error.name === "ZodError") {
		const issues = (error as any).issues as
			| Array<{ message?: string }>
			| undefined;
		const first = issues?.[0]?.message;
		return {
			message: "Ошибка валидации",
			description: first ? String(first) : "Проверьте поля формы.",
		};
	}

	if (error instanceof Error) {
		return {
			message: error.message || "Произошла ошибка",
		};
	}

	if (typeof error === "string") {
		return { message: error };
	}

	return { message: "Произошла ошибка. Попробуйте ещё раз." };
}
