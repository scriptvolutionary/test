import "./styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { bootstrapTheme } from "@/platform/app/bootstrap";

import { NexusProviders } from "./providers";

bootstrapTheme();

function Bootstrap() {
	return <NexusProviders />;
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Bootstrap />
	</StrictMode>,
);
