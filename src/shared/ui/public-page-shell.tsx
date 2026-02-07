import { Backdrop } from './backdrop'
import { BrandItem } from './brand-item'

type PublicPageShellProps = {
	backdropMode?: 'public' | 'protected'
	version: React.ReactNode
	headerAction: React.ReactNode
	children: React.ReactNode
}

export function PublicPageShell({
	backdropMode = 'public',
	headerAction,
	version,
	children
}: PublicPageShellProps) {
	return (
		<div className='relative min-h-dvh overflow-hidden'>
			<Backdrop mode={backdropMode} />

			<div className='relative mx-auto flex min-h-dvh max-w-350 flex-col px-6 lg:px-12'>
				<header className='flex items-center justify-between py-4 lg:py-6'>
					<BrandItem />
					{headerAction && headerAction}
				</header>

				<main className='flex flex-1 items-center justify-center'>{children}</main>

				<footer className='py-4 text-center text-muted-foreground text-xs lg:py-6'>
					<span>ООО "Ревелк" © 2026</span>
					<span className='mx-2'>·</span>
					<span>Версия: {version}</span>
				</footer>
			</div>
		</div>
	)
}
