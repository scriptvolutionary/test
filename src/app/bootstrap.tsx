import './styles.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { initTheme } from '@/platform/inits'

import { NexusProviders } from './providers'

initTheme()

function Bootstrap() {
	return <NexusProviders />
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Bootstrap />
	</StrictMode>
)
