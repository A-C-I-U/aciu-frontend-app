import { Avatar } from "@mui/material"
import DummyProfile from "/images/avatar.png"
import { EmptyMemberActivity } from "@/components/EmptyStates";
import type { MemberProfile } from "@/services/types/database";

const activities = [];

// Use Implementation on Dues Preview Activity Log
export default function MemberActivityTab({ branchMember }: {
    branchMember: MemberProfile
}) {
    return (
        <div className="flex flex-col gap-7.5 overflow-y-auto">
            {activities.length > 0  ?
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <Avatar src={DummyProfile} className="rounded-[4.8rem]" />
                        <div className="flex flex-col gap-1">
                            {branchMember.fullName}
                        </div>
                    </div>
                </div>
                :
                <EmptyMemberActivity />
            }
        </div>
       
    )
}