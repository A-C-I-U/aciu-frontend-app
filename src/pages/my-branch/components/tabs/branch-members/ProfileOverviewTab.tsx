import type { BranchMemberDataType } from "@/utils/types";
import { MemberField } from "./ViewBranchMember";
import { Copy } from "iconsax-react";
import { useMemberOverview } from "@/services/hooks/branch";
import { Skeleton } from "@mui/material";
import { copyTextToClipboard } from "@/utils/helpers";

export default function ProfileOverviewTab({
    branchMember
}: { branchMember: BranchMemberDataType }) {
    const { data: overview, isLoading } = useMemberOverview(branchMember.id);

    if (isLoading) {
        return (
            <div className="grid md:grid-cols-2 justify-between gap-x-8 gap-y-7.5">
                {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={60} className="rounded-lg" />
                ))}
            </div>
        );
    }

    if (!overview) return null;

    return (
        <div className="grid md:grid-cols-2 justify-between gap-x-8 gap-y-7.5">
            <MemberField title="Full Name" content={overview.fullName} />
            <MemberField
                title="Email Address"
                content={
                    <span className="flex gap-2 items-center">
                        {overview.email}
                        <button onClick={() => copyTextToClipboard(overview.email)}>
                            <Copy variant="Bold" size={20} color="#00B686" />
                        </button>
                    </span>
                }
            />
            <MemberField title="Phone Number" content={overview.phone} />
            <MemberField title="Branch" content={overview.branch || "N/A"} />
            <MemberField title="Age Grade" content={overview.ageGrade} />
            <MemberField title="Occupation" content={overview.occupation} />
            <MemberField title="Village" content={overview.village} />
            <MemberField title="Gender" content={overview.gender} />
            <MemberField title="Events" content={`${overview.events} Registrations`} />
            <MemberField title="Projects" content={`${overview.projects} Support`} />
        </div>
    )
}