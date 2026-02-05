import { Avatar, AvatarFallback } from "@/shared/ui/primitives/avatar";
import { Skeleton } from "@/shared/ui/primitives/skeleton";

import {
	formatUserName,
	getUserInitials,
	type User,
} from "@/platform/entities/user";

interface UserProfileCardProps {
	data?: Partial<User> | null;
	isLoading?: boolean;
}

function UserProfileCard({ data, isLoading }: UserProfileCardProps) {
	if (isLoading) return <UserProfileSkeleton />;

	const title = formatUserName(data);
	const subtitle = data?.email;
	const initials = getUserInitials(data);

	return (
		<>
			<Avatar>
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<div className="grid flex-1 text-left text-xs leading-tight">
				<span className="truncate font-medium text-sm">{title}</span>
				<span className="truncate text-muted-foreground">{subtitle}</span>
			</div>
		</>
	);
}

function UserProfileSkeleton() {
	return (
		<>
			<Skeleton className="size-8 rounded-md" />
			<div className="flex-1 space-y-1">
				<Skeleton className="h-3 w-32" />
				<Skeleton className="h-3 w-24" />
			</div>
		</>
	);
}

export { UserProfileCard };
