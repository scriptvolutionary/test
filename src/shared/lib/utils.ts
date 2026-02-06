import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export type SupportReport = {
	code?: number
	title: string
	url?: string
	details?: string
	module?: string
}

export function buildSupportMessage(report: SupportReport): string {
	const now = new Date().toLocaleString('ru-RU')
	const ua = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'

	return (
		`Здравствуйте!\n\n` +
		`${report.title}\n\n` +
		(report.code ? `Код: ${report.code}\n` : '') +
		(report.url ? `URL: ${report.url}\n` : '') +
		(report.module ? `Модуль: ${report.module}\n` : '') +
		(report.details ? `Детали: ${report.details}\n` : '') +
		`Дата/время: ${now}\n` +
		`Браузер: ${ua}\n`
	)
}
