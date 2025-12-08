import type { BranchMemberDataType } from "@/utils/types"
import { Avatar } from "@mui/material"
import DummyProfile from "/images/avatar.png"
import { EmptyMemberActivity } from "../../EmptyStates";

const activities = [];

export default function MemberActivityTab({ branchMember }: {
    branchMember: BranchMemberDataType
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