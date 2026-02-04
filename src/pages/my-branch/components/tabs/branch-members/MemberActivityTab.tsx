import type { BranchMemberDataType } from "@/utils/types"
import { Avatar, Skeleton } from "@mui/material"
import DummyProfile from "/images/avatar.png"
import { EmptyMemberActivity } from "../../EmptyStates";
import { useMemberActivity } from "@/services/hooks/branch";

export default function MemberActivityTab({ branchMember }: {
    branchMember: BranchMemberDataType
}) {
    const { data: activityData, isLoading } = useMemberActivity(branchMember.id);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={60} className="rounded-lg" />
                ))}
            </div>
        );
    }

    const activities = activityData?.logs || [];

    return (
        <div className="flex flex-col gap-7.5 overflow-y-auto">
            {activities.length > 0 ?
                <div className="flex flex-col gap-4">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex gap-2 items-start">
                            <Avatar src={DummyProfile} className="rounded-[4.8rem] !w-10 !h-10" />
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-aciu-border-grey">
                                    {activity}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <EmptyMemberActivity />
            }
        </div>

    )
}