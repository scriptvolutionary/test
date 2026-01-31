import "./styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { initHttpSync, initThemeSync } from "@/platform/core/init";

import { AppProviders } from "./providers/app-providers";

initThemeSync();
initHttpSync();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProviders />
	</StrictMode>,
);
