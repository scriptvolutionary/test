export type ApiMetadataBase = {
	code: number;
	message: string;
	description: string;
	lang: string;
	count: number;
};

export type ApiMetadataError = {
	code: string | number;
	message: string;
	reason: string;
	solution: string;
	lang: string;
	error_details?: {
		message?: string;
		[key: string]: unknown;
	};
	[key: string]: unknown;
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

export type ApiResponseError = { metadata: ApiMetadataError };
