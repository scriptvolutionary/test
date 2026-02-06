import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'

function Collapsible({ test, ...props }: CollapsiblePrimitive.Root.Props & { test?: string }) {
	return <CollapsiblePrimitive.Root data-slot='collapsible' data-test={test} {...props} />
}

function CollapsibleTrigger({
	test,
	...props
}: CollapsiblePrimitive.Trigger.Props & { test?: string }) {
	return (
		<CollapsiblePrimitive.Trigger data-slot='collapsible-trigger' data-test={test} {...props} />
	)
}

function CollapsibleContent({
	test,
	...props
}: CollapsiblePrimitive.Panel.Props & { test?: string }) {
	return <CollapsiblePrimitive.Panel data-slot='collapsible-content' data-test={test} {...props} />
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
