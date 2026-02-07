import './styles.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { initHttpSync, initStoresSync, initThemeSync } from '@/platform/core/init'

import { AppProviders } from './providers/app-providers'
import { router } from './router'

async function bootstrap() {
	await initStoresSync()

	initThemeSync()
	initHttpSync({
		toLogin: (redirect) => {
			void router.navigate({
				to: '/log-in',
				search: { redirect }
			})
		},
		toForbidden: (from) => {
			void router.navigate({
				to: '/forbidden',
				search: { from }
			})
		},
		getCurrentPath: () => router.state.location.href
	})

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<AppProviders />
		</StrictMode>
	)
}

void bootstrap()
