import { resolve } from "node:path";

import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

type ServerConfig = { host?: string | boolean; port?: number };

export default defineConfig(({ mode }) => {
	const namespace = "NEXUS_" as const;
	const env = loadEnv(mode, process.cwd(), namespace);

	const createServerConfig = ({ host, port }: ServerConfig) => ({
		host: env.NEXUS_APP_HOST ?? host,
		port,
		strictPort: true,
		allowedHosts: JSON.parse(env.NEXUS_APP_ALLOWED_HOSTS),
	});

	return {
		envPrefix: namespace,

		server: createServerConfig({ host: true, port: 4000 }),
		preview: createServerConfig({ host: "localhost", port: 4443 }),

		plugins: [
			devtools({
				removeDevtoolsOnBuild: true,
				eventBusConfig: {
					port: 4001,
					debug: env.NEXUS_APP_DEBUG === "true",
				},
				editor: {
					name: "VSCode",
					open: async (path, lineNumber, columnNumber) => {
						const { exec } = await import("node:child_process");
						exec(
							`code -g "${(path).replaceAll("$", "\\$")}${lineNumber ? `:${lineNumber}` : ""}${columnNumber ? `:${columnNumber}` : ""}"`,
						);
					},
				},
			}),
			tanstackRouter({
				target: "react",
				autoCodeSplitting: true,
				enableRouteGeneration: false,
			}),
			react({ babel: { plugins: [["babel-plugin-react-compiler"]] } }),
			tailwindcss({ optimize: true }),
		],

		resolve: {
			alias: { "@": resolve(__dirname, "src") },
		},

		define: {
			__API_HOST__: JSON.stringify(env.NEXUS_API_HOST),
			__API_PORT__: JSON.stringify(env.NEXUS_API_PORT),
			__ENV__: JSON.stringify(env.NEXUS_APP_ENV),
			__DEBUG_MODE__: env.NEXUS_APP_DEBUG === "true",
			__ENABLED_MODULES__: JSON.stringify(
				JSON.parse(env.NEXUS_ENABLED_MODULES),
			),
		},
	};
});
