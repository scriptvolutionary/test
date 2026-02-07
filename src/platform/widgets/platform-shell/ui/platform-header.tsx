import { BellPlusIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/primitives/button'
import { Separator } from '@/shared/ui/primitives/separator'
import { SidebarTrigger } from '@/shared/ui/primitives/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/primitives/tooltip'

import { ThemeSwitcher } from '@/platform/features/theme'

import { PlatformBreadcrumbs } from './platform-breadcrumbs'

export function PlatformHeader() {
	const [isScrolled, setIsScrolled] = React.useState(false)

	React.useEffect(() => {
		if (typeof window === 'undefined') return

		let lastScrolled = window.scrollY > 0
		setIsScrolled(lastScrolled)

		const handleScroll = () => {
			const nextScrolled = window.scrollY > 0
			if (nextScrolled === lastScrolled) return
			lastScrolled = nextScrolled
			setIsScrolled(nextScrolled)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header
			className={cn(
				'sticky top-0 z-20 flex h-14 items-center gap-2 bg-background/25 px-4 backdrop-blur-xs transition-all duration-200 ease-in-out',
				isScrolled && 'shadow-xs'
			)}
		>
			<SidebarTrigger />
			<div className='h-auto'>
				<Separator orientation='vertical' className='h-6' />
			</div>{' '}
			<PlatformBreadcrumbs />
			<div className='ml-auto flex items-center gap-2'>
				<ThemeSwitcher />
				<Tooltip>
					<TooltipTrigger
						render={
							<Button variant='ghost' size='icon-sm' aria-label='Новое уведомление'>
								<BellPlusIcon />
							</Button>
						}
					/>
					<TooltipContent>
						<p>Новое уведомление</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</header>
	)
}
