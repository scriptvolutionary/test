import "./styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
	initHttpSync,
	initStoresSync,
	initThemeSync,
} from "@/platform/core/init";

import { AppProviders } from "./providers/app-providers";

async function bootstrap() {
	await initStoresSync();

	initThemeSync();
	initHttpSync();

	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<AppProviders />
		</StrictMode>,
	);
}

void bootstrap();
