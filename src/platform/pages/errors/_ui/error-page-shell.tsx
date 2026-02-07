import * as React from 'react'

import { CardDescription } from '@/shared/ui/primitives/card'
import { PublicPageShell } from '@/shared/ui/public-page-shell'

import { StatusActions } from '@/platform/core/ui/status-actions'
import { runtime } from '@/platform/infra/config'

type ErrorPageShellProps = {
	title: React.ReactNode
	description: React.ReactNode
	headerAction: React.ReactNode
}

export function ErrorPageShell({ headerAction, title, description }: ErrorPageShellProps) {
	return (
		<PublicPageShell headerAction={headerAction} version={runtime.version}>
			<div className='zoom-in-90 fade-in-15 slide-in-from-bottom-5 w-full max-w-sm animate-in gap-6 space-y-12 py-6 duration-200 ease-in-out'>
				<div className='px-6 text-center'>
					<div className='font-bold text-9xl'>{title}</div>
					{description ? <CardDescription>{description}</CardDescription> : null}
				</div>
				<div className='mx-auto max-w-xs space-y-6 px-6'>
					<StatusActions />
				</div>
			</div>
		</PublicPageShell>
	)
}
