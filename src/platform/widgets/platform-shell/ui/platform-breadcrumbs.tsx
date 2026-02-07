import { type AnyRouteMatch, Link, useMatches } from '@tanstack/react-router'
import * as React from 'react'

import { useIsMobile } from '@/shared/hooks/use-mobile'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/shared/ui/primitives/breadcrumb'

import { useCurrentModule } from '@/platform/core/hooks'

type Crumb = {
	label: string
	to: AnyRouteMatch['fullPath']
	params: AnyRouteMatch['params']
}

export function PlatformBreadcrumbs() {
	const matches = useMatches()
	const isMobile = useIsMobile()
	const { module: currentModule, meta: currentMeta } = useCurrentModule()

	const crumbs = React.useMemo<Crumb[]>(() => {
		return matches.flatMap((match) => {
			const isModuleRoot = currentModule && match.fullPath === `/platform/m/${currentModule}`
			const fromStatic = match.staticData?.crumb
			const labelFromStatic =
				typeof fromStatic === 'function' ? fromStatic({ params: match.params }) : fromStatic

			if (!labelFromStatic && !isModuleRoot) return []

			const label =
				isModuleRoot && currentMeta?.title ? currentMeta.title : (labelFromStatic ?? match.fullPath)

			return [
				{
					label,
					to: match.fullPath,
					params: match.params
				}
			]
		})
	}, [matches, currentModule, currentMeta?.title])

	if (!crumbs.length) return null

	const lastCrumb = crumbs[crumbs.length - 1]
	const hiddenCrumbs = crumbs.slice(0, -1)

	return (
		<Breadcrumb>
			<BreadcrumbList className='flex-nowrap'>
				{isMobile && hiddenCrumbs.length ? (
					<BreadcrumbItem>
						<BreadcrumbPage>{lastCrumb.label}</BreadcrumbPage>
					</BreadcrumbItem>
				) : (
					crumbs.map((crumb, index) => {
						const isLast = index === crumbs.length - 1

						return (
							<React.Fragment key={crumb.to}>
								<BreadcrumbItem>
									{isLast ? (
										<BreadcrumbPage>{crumb.label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink render={<Link to={crumb.to} params={crumb.params} />}>
											{crumb.label}
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{!isLast && <BreadcrumbSeparator />}
							</React.Fragment>
						)
					})
				)}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
