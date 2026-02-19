import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import MobileOverview from "./overview/Mobile";
import { type TabItem } from "@/utils/types";
import Desktop from "./overview/Desktop";
import { useMemberBranchDashboard } from "@/services/hooks/members";
import BranchDues from "./BranchDues";
import BranchLeadership from "./BranchLeadership";
import BranchEvents from "./BranchEvents";
import BranchGallery from "./BranchGallery";

export const branchTabs: TabItem[] = [
    { key: "branch-dues", label: "Branch Dues", content: <BranchDues />},
    { key: "branch-leadership", label: "Branch Leadership", content: <BranchLeadership />},
    { key: "branch-events", label: "Branch Events", content: <BranchEvents />},
    { key: "branch-gallery", label: "Branch Gallery", content: <BranchGallery /> }
]

export default function MemberBranch() {
    const isMedium = useMediaQuery("(max-width: 1024px)");
    const [activeTab, setActiveTab] = useState<TabItem>(branchTabs[0]);

    const { data, isLoading } = useMemberBranchDashboard();

    return (
        <div className="my-4 mx-5">
            {isMedium ? (
                <MobileOverview activeTab={activeTab} setActiveTab={setActiveTab} overviewData={data} isLoading={isLoading} />
            ) : (
                <Desktop activeTab={activeTab} setActiveTab={setActiveTab} overviewData={data} isLoading={isLoading} />
            )}
        </div>
    )
}