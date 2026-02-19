import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import MobileOverview from "./overview/Mobile";
import { type TabItem } from "@/utils/types";
import Desktop from "./overview/Desktop";
import { useMemberBranchDashboard } from "@/services/hooks/members";

export const branchTabs: TabItem[] = [
    { key: "branch-dues", label: "Branch Dues", content: <></>},
    { key: "branch-leadership", label: "Branch Leadership", content: <></>},
    { key: "branch-events", label: "Branch Events", content: <></>},
    { key: "branch-gallery", label: "Branch Gallery", content: <></> }
]

export default function MemberBranch() {
    const isMedium = useMediaQuery("(max-width: 1024px)");
    const [activeTab, setActiveTab] = useState<TabItem>(branchTabs[0]);

    const { data, isLoading } = useMemberBranchDashboard();

    return (
        <>
            {isMedium ? (
                <MobileOverview activeTab={activeTab} setActiveTab={setActiveTab} overviewData={data} isLoading={isLoading} />
            ) : (
                <Desktop activeTab={activeTab} setActiveTab={setActiveTab} overviewData={data} isLoading={isLoading} />
            )}
        </>
    )
}