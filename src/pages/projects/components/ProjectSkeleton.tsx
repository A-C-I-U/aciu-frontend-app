import { Skeleton } from "@mui/material";

export const ProjectSkeleton = () => (
    <div className="rounded-[1.25rem] py-3.5 px-2 bg-card-200 flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-3.5">
                <Skeleton variant="rounded" width="100%" height={154} />
                <Skeleton variant="rounded" width={100} height={32} />
            </div>
            <Skeleton variant="text" width="80%" height={32} />
            <Skeleton variant="rounded" width="100%" height={8} />
            <Skeleton variant="text" width="100%" height={60} />
        </div>
        <Skeleton variant="rounded" width={184} height={56} />
    </div>
    );