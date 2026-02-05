import * as React from "react";

import { Avatar, AvatarFallback } from "@/shared/ui/primitives/avatar";
import { Skeleton } from "@/shared/ui/primitives/skeleton";

import {
	formatUserName,
	getUserInitials,
	type User,
} from "@/platform/entities/user";

type UserLike = Partial<User> | null | undefined;

type UserProfileVariant = "menu" | "label";

interface UserProfileProps {
	user?: UserLike;
	isLoading?: boolean;
	variant?: UserProfileVariant;
}

function useUserProfileView(user: UserLike) {
	return React.useMemo(() => {
		const title = formatUserName(user);
		const subtitle = user?.email ?? "";
		const initials = getUserInitials(user);

		const role = user?.role?.name ?? "";
		const id = user?.id ?? "";

		return { title, subtitle, initials, role, id };
	}, [user]);
}

function UserProfile({ user, isLoading, variant = "menu" }: UserProfileProps) {
	const { title, subtitle, initials, role, id } = useUserProfileView(user);

	if (isLoading) return <UserProfileSkeleton variant={variant} />;

	if (variant === "label") {
		return (
			<div className="grid text-left leading-tight text-xs">
				<span className="truncate font-medium text-sm">{role || "—"}</span>
				<span className="truncate text-muted-foreground">ID: {id || "—"}</span>
			</div>
		);
	}

	return (
		<div className="flex items-center align-middle gap-2 min-w-0">
			<Avatar className="size-8 shrink-0">
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>

			<div className="grid min-w-0 flex-1 text-left leading-tight text-xs">
				<span className="truncate font-medium text-sm">{title}</span>
				<span className="truncate text-muted-foreground">{subtitle}</span>
			</div>
		</div>
	);
}

function UserProfileSkeleton({ variant }: { variant: UserProfileVariant }) {
	if (variant === "label") {
		return (
			<div className="space-y-1">
				<Skeleton className="h-3 w-28" />
				<Skeleton className="h-3 w-20" />
			</div>
		);
	}

	return (
		<div className="flex items-center gap-2 min-w-0">
			<Skeleton className="size-8 rounded-md shrink-0" />
			<div className="flex-1 space-y-1">
				<Skeleton className="h-3 w-32" />
				<Skeleton className="h-3 w-24" />
			</div>
		</div>
	);
}

export { UserProfile, type UserProfileVariant };
