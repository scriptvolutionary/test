import { resolve } from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'

import pkg from './package.json'

type ServerConfig = { host?: string | boolean; port?: number }

export default defineConfig(({ mode, command }) => {
	const namespace = 'NEXUS_' as const
	const env = loadEnv(mode, process.cwd(), namespace)

	const isServe = command === 'serve'

	const createServerConfig = ({ host, port }: ServerConfig) => ({
		host: env.NEXUS_APP_HOST ?? host,
		port,
		strictPort: true,
		allowedHosts: JSON.parse(env.NEXUS_APP_ALLOWED_HOSTS)
	})

	return {
		envPrefix: namespace,

		server: createServerConfig({ host: true, port: 4000 }),
		preview: createServerConfig({ host: 'localhost', port: 4443 }),

		plugins: [
			isServe &&
				checker({
					typescript: true,
					biome: { command: 'lint' },
					enableBuild: false,
					terminal: true
				}),
			isServe &&
				devtools({
					removeDevtoolsOnBuild: true,
					eventBusConfig: { port: 4001, debug: env.NEXUS_APP_DEBUG === 'true' },
					consolePiping: { enabled: isServe },
					enhancedLogs: { enabled: isServe },
					logging: false,
					editor: {
						name: 'VSCode',
						open: async (path, lineNumber, columnNumber) => {
							const { exec } = await import('node:child_process')
							exec(
								`code -g "${(path).replaceAll('$', '\\$')}${lineNumber ? `:${lineNumber}` : ''}${columnNumber ? `:${columnNumber}` : ''}"`
							)
						}
					}
				}),
			tanstackRouter({
				target: 'react',
				autoCodeSplitting: true,
				enableRouteGeneration: false
			}),
			react({ babel: { plugins: [['babel-plugin-react-compiler']] } }),
			tailwindcss({ optimize: true })
		].filter(Boolean),

		resolve: {
			alias: { '@': resolve(__dirname, 'src') }
		},

		define: {
			__USE_SLI__: env.NEXUS_USE_SLI === 'true',
			__APP_VERSION__: JSON.stringify(pkg.version),
			__API_HOST__: JSON.stringify(env.NEXUS_API_HOST),
			__API_PORT__: JSON.stringify(env.NEXUS_API_PORT),
			__DEBUG_MODE__: env.NEXUS_APP_DEBUG === 'true',
			__ENABLED_MODULES__: JSON.stringify(JSON.parse(env.NEXUS_ENABLED_MODULES))
		},

		build: {
			outDir: './dist',
			emptyOutDir: true,
			reportCompressedSize: true,

			cssCodeSplit: true,
			cssMinify: true,
			sourcemap: false,

			commonjsOptions: { transformMixedEsModules: true },

			rolldownOptions: {
				output: {
					hashCharacters: 'hex',
					chunkFileNames: 'assets/nexus-[name]-[hash].js',
					entryFileNames: 'assets/nexus-[name]-[hash].js',
					assetFileNames: 'assets/nexus-[name]-[hash][extname]',

					advancedChunks: {
						includeDependenciesRecursively: true,
						groups: [
							{
								name: 'vendor-react',
								priority: 50,
								test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/
							},
							{
								name: 'vendor-tanstack',
								priority: 45,
								test: /node_modules[\\/]@tanstack[\\/]/
							},

							{
								name: 'vendor-ui',
								priority: 40,
								test: /node_modules[\\/](lucide-react|sonner|@base-ui|class-variance-authority|clsx|tailwind-merge)[\\/]/
							},
							{
								name: 'vendor-http',
								priority: 35,
								test: /node_modules[\\/]axios[\\/]/
							},
							{
								name: 'vendor-validate',
								priority: 34,
								test: /node_modules[\\/]zod[\\/]/
							},
							{
								name: 'vendor-state',
								priority: 33,
								test: /node_modules[\\/](zustand|js-cookie)[\\/]/
							},

							{ name: 'vendor-misc', priority: 10, test: /node_modules[\\/]/ },

							{ name: 'app-shared', priority: 9, test: /src[\\/]shared[\\/]/ },
							{
								name: 'app-platform',
								priority: 8,
								test: /src[\\/]platform[\\/]/
							},
							{
								name: 'app-modules',
								priority: 7,
								test: /src[\\/]modules[\\/]/
							}
						]
					}
				}
			}
		}
	}
})
