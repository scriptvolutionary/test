import "./styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { initThemeSync } from "@/platform/app/init";

import { AppProviders } from "./providers";

initThemeSync();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProviders />
	</StrictMode>,
);
