import type { BranchMemberDataType } from "@/utils/types";
import { MemberField } from "./ViewBranchMember";

export default function ProfileOverviewTab({
    branchMember
}: { branchMember: BranchMemberDataType}) {
    return (
        <div className="grid md:grid-cols-2 justify-between gap-x-8">
            <MemberField title="Full Name" content={branchMember.fullName} />
            <MemberField title="Email Address" content="person@email.com" />
            <MemberField title="Phone Number" content="23480 8575 5858" />
            <MemberField title="Branch" content="ACIU Lagos" />
            <MemberField title="Age Grade" content={branchMember.ageGrade} />
            <MemberField title="Occupation" content={branchMember.occupation} />
            <MemberField title="Village" content="Ameke" />
            <MemberField title="Gender" content="Male" />
            <MemberField title="Events" content="3 Registrations" />
            <MemberField title="Projects" content="1 Support" />            
        </div>
    )
}