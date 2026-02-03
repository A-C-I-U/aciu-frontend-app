import type { BranchMemberDataType } from "@/utils/types";
import { MemberField } from "./ViewBranchMember";
import { Copy } from "iconsax-react";
import { copyTextToClipboard } from "@/utils/helpers";

export default function ProfileOverviewTab({
    branchMember
}: { branchMember: BranchMemberDataType}) {
    return (
        <div className="grid md:grid-cols-2 justify-between gap-x-8 gap-y-7.5">
            <MemberField title="Full Name" content={branchMember.fullName} />
            <MemberField 
                title="Email Address" 
                content={<span className="flex gap-2 items-center">person@email.com <button aria-label="Branch member's email" onClick={() => copyTextToClipboard("person@email.com")}><Copy variant="Bulk" size={20} color="#00B686" /></button></span>} 
            />
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