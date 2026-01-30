export type ApiMetadataBase = {
	code: number;
	message: string;
	description: string;
	lang: string;
	count: number;
};

export type ApiPagination = {
	current_page: number;
	last_page: number;
	per_page: number;
	from: number;
	to: number;
	total: number;
};

export type ApiMetadata = ApiMetadataBase & { pagination?: ApiPagination };

export type ApiResponse<T> = { metadata: ApiMetadata; data: T };
