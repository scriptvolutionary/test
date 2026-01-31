import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Label({
	className,
	test,
	...props
}: React.ComponentProps<"label"> & { test?: string }) {
	return (
		<label
			data-slot="label"
			data-test={test}
			className={cn(
				"gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
