/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
type MetaTag =
	| { title: string }
	| { name: string; content: string }
	| { property: string; content: string };

type LinkTag = React.LinkHTMLAttributes<HTMLLinkElement>;

export interface DefineHeadDefaults {
	appName: string;
	description: string;
	iconHref: string;
	titleTemplate?: (title: string) => string;
}

export interface DefineHeadInput {
	title?: string;
	disableTitleTemplate?: boolean;
	description?: string;
	iconHref?: string;
	robots?: string;
	canonical?: string;
	meta?: Array<
		{ name: string; content: string } | { property: string; content: string }
	>;
	links?: LinkTag[];
}

const DEFAULTS: DefineHeadDefaults = {
	appName: "Nexus",
	description: "Modern modular platform",
	iconHref: "/nexus_t_512x512.png",
	titleTemplate: (t) => `${t} · Nexus`,
};

function dedupeMeta(meta: MetaTag[]) {
	const map = new Map<string, MetaTag>();

	for (const tag of meta) {
		if ("title" in tag) {
			map.set("title", tag);
			continue;
		}
		if ("name" in tag) {
			map.set(`name:${tag.name}`, tag);
			continue;
		}
		if ("property" in tag) {
			map.set(`prop:${tag.property}`, tag);
			continue;
		}
	}

	return Array.from(map.values());
}

function dedupeLinks(links: LinkTag[]) {
	const map = new Map<string, LinkTag>();
	for (const l of links) {
		const rel = (l.rel ?? "").toString();
		const href = (l.href ?? "").toString();
		map.set(`${rel}|${href}`, l);
	}
	return Array.from(map.values());
}

export function defineHead(
	input?: DefineHeadInput,
	options?: { defaults?: Partial<DefineHeadDefaults> },
) {
	const cfg: DefineHeadDefaults = {
		...DEFAULTS,
		...options?.defaults,
	};

	return () => {
		const rawTitle = input?.title ?? cfg.appName;

		const title = input?.disableTitleTemplate
			? rawTitle
			: cfg.titleTemplate
				? cfg.titleTemplate(rawTitle)
				: rawTitle;

		const description = input?.description ?? cfg.description;

		const meta = dedupeMeta([
			{ title },
			{ name: "description", content: description },
			...(input?.robots ? [{ name: "robots", content: input.robots }] : []),
			...(input?.meta ?? []),
		]);

		const links = dedupeLinks([
			{ rel: "icon", href: input?.iconHref ?? cfg.iconHref },
			...(input?.canonical
				? [{ rel: "canonical", href: input.canonical }]
				: []),
			...(input?.links ?? []),
		]);

		return { meta, links };
	};
}

export function defineHeadFn(
	factory: (ctx: any) => DefineHeadInput,
	options?: { defaults?: Partial<DefineHeadDefaults> },
) {
	return (ctx: any) => defineHead(factory(ctx), options)();
}
