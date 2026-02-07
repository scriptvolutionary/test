import { Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/shared/ui/primitives/button'

export function UsersListPageComponent() {
	return (
		<div className='mx-auto flex w-full max-w-350 flex-1 flex-col gap-4'>
			<div className='flex flex-wrap items-start justify-between gap-3'>
				<div className='space-y-1'>
					<h1 className='font-semibold text-lg'>Пользователи</h1>
					<p className='text-muted-foreground text-sm'>
						Управление доступом, ролями и статусами пользователей платформы.
					</p>
				</div>
				<div className='flex flex-wrap items-center gap-2'>
					<Button
						size='sm'
						nativeButton={false}
						render={
							<Link to='/platform/users/new'>
								<PlusIcon />
								Добавить
							</Link>
						}
					/>
				</div>
			</div>
		</div>
	)
}
