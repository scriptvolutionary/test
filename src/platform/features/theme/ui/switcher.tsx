import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/primitives/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/primitives/tooltip'

import { useTheme } from '@/platform/core/hooks'

import { themeOptions } from '../model/theme'

function ThemeSwitcher() {
	const { theme, setTheme } = useTheme()

	return (
		<div className='inline-flex items-center rounded-md border p-0.5'>
			{themeOptions.map(({ value, icon, label }) => {
				const active = value === theme
				const Icon = icon

				return (
					<Tooltip key={value}>
						<TooltipTrigger
							render={
								<Button
									variant='ghost'
									size='icon-xs'
									className={cn(active && 'bg-muted text-foreground')}
									aria-pressed={active}
									onClick={() => setTheme(value)}
								>
									<Icon />
									<span className='sr-only'>{label}</span>
								</Button>
							}
						/>
						<TooltipContent>
							<p>{label}</p>
						</TooltipContent>
					</Tooltip>
				)
			})}
		</div>
	)
}

export { ThemeSwitcher }
