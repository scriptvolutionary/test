import { useRouterState } from '@tanstack/react-router'
import React from 'react'

import { cn } from '@/shared/lib/utils'

type PendingIndicatorProps = {
	force?: boolean
	minVisibleMs?: number
}

export function PendingIndicator({ force = false, minVisibleMs = 300 }: PendingIndicatorProps) {
	const pending = useRouterState({ select: (s) => s.status === 'pending' })

	const active = force || pending

	const [mounted, setMounted] = React.useState(active)
	const [visible, setVisible] = React.useState(active)

	const shownAtRef = React.useRef<number | null>(null)
	const timerRef = React.useRef<number | null>(null)

	React.useEffect(() => {
		return () => {
			if (timerRef.current) window.clearTimeout(timerRef.current)
		}
	}, [])

	React.useEffect(() => {
		if (force) {
			setMounted(true)
			setVisible(true)
			return
		}

		if (timerRef.current) {
			window.clearTimeout(timerRef.current)
			timerRef.current = null
		}

		if (active) {
			shownAtRef.current = performance.now()
			setMounted(true)
			requestAnimationFrame(() => setVisible(true))
			return
		}

		const started = shownAtRef.current ?? performance.now()
		const elapsed = performance.now() - started
		const wait = Math.max(0, minVisibleMs - elapsed)

		timerRef.current = window.setTimeout(() => {
			setVisible(false)

			timerRef.current = window.setTimeout(() => {
				setMounted(false)
				shownAtRef.current = null
				timerRef.current = null
			}, 300)
		}, wait) as unknown as number
	}, [active, force, minVisibleMs])

	if (!mounted) return null

	return (
		<div
			role='status'
			aria-live='polite'
			aria-busy={pending ? 'true' : 'false'}
			className={cn(
				'fixed inset-0 z-1000',
				'bg-background/25 backdrop-blur-xs',
				'transition-opacity duration-200 ease-out',
				visible ? 'opacity-100' : 'opacity-0',
				'pointer-events-none'
			)}
		>
			<div className='flex h-full w-full items-center justify-center'>
				<div className='zoom-in-95 fade-in grid animate-in grid-cols-2 gap-2 duration-200'>
					<Square delay='0ms' />
					<Square delay='300ms' />
					<Square delay='600ms' />
					<Square delay='900ms' />
				</div>
			</div>
		</div>
	)
}

export function Square({ delay }: { delay: string }) {
	return (
		<div
			className={cn(
				'size-8 rounded-md',
				'bg-linear-to-br bg-primary to-muted/80',
				'animate-[nexus-quad_2s_ease-in-out_infinite]'
			)}
			style={{ animationDelay: delay }}
			aria-hidden='true'
		/>
	)
}
