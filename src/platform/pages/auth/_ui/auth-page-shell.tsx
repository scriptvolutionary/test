import { useLocation } from '@tanstack/react-router'
import * as React from 'react'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/shared/ui/primitives/card'
import { PublicPageShell } from '@/shared/ui/public-page-shell'

import { useCurrentModule } from '@/platform/core/hooks'
import { ModuleFeedbackButton } from '@/platform/core/ui/module-feedback-button'
import { runtime } from '@/platform/infra/config'

type AuthPageShellProps = {
	title: React.ReactNode
	description: React.ReactNode
	children: React.ReactNode
}

export function AuthPageShell({ title, description, children }: AuthPageShellProps) {
	const location = useLocation()
	const { meta } = useCurrentModule()

	return (
		<PublicPageShell
			headerAction={
				<ModuleFeedbackButton
					variant='ghost'
					url={location.href}
					report={{ title: 'У меня есть вопрос...' }}
				/>
			}
			version={runtime.version}
		>
			<Card className='zoom-in-90 fade-in-15 slide-in-from-bottom-5 w-full max-w-sm animate-in gap-6 bg-card/25 py-6 duration-200 ease-in-out'>
				<CardHeader className='justify-center px-6 text-center'>
					<div className='inline-flex items-center gap-2 rounded-full border bg-background/25 px-3 py-1 text-muted-foreground text-xs'>
						<span className='font-medium text-foreground/80'>{meta.title}</span>
						<span className='opacity-70'>·</span>
						<span className='opacity-90'>Управление</span>
					</div>
				</CardHeader>
				<CardHeader className='px-6 text-center'>
					<CardTitle className='text-xl'>{title}</CardTitle>
					{description ? <CardDescription>{description}</CardDescription> : null}
				</CardHeader>
				<CardContent className='space-y-6 px-6'>{children}</CardContent>
			</Card>
		</PublicPageShell>
	)
}
