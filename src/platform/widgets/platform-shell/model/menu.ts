import type { LucideIcon } from 'lucide-react'
import { HomeIcon, ShieldIcon, UsersIcon } from 'lucide-react'

export type PlatformMenuItem = {
	id: string
	label: string
	to: string
	icon: LucideIcon
}

export type ModuleMenuItem = {
	id: string
	label: string
	to: string
	icon: LucideIcon
}

export type ModuleMenuMap = Record<string, ModuleMenuItem[]>

export const platformMenuItems: PlatformMenuItem[] = [
	{ id: 'home', label: 'Главная', to: '/platform', icon: HomeIcon },
	{
		id: 'users',
		label: 'Пользователи',
		to: '/platform/users',
		icon: UsersIcon
	},
	{ id: 'roles', label: 'Роли', to: '/platform/roles', icon: ShieldIcon }
]

export const moduleMenuItems: ModuleMenuMap = {
	csoo: [
		{
			id: 'csoo-home',
			label: 'Главная',
			to: '/platform/m/csoo',
			icon: HomeIcon
		}
	],
	agroservice: [
		{
			id: 'agroservice-home',
			label: 'Главная',
			to: '/platform/m/agroservice',
			icon: HomeIcon
		}
	]
}
