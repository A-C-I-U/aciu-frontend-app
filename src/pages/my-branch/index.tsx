import type { ExtendedTabItem } from "@/utils/types";
import { useState } from "react";
import { myBranchTabs } from "./components/MyBranchTabs";
import { useMediaQuery } from "@mui/material";
import MyBranchMobileOverview from "./components/overview/Mobile";
import MyBranchDesktopOverview from "./components/overview/Desktop";

export default function MyBranchPage() {
    const isMedium = useMediaQuery("(max-width: 1024px)");
    const [activeTab, setActiveTab] = useState<ExtendedTabItem>(myBranchTabs[0])

    return (
        <>
            {isMedium ? (
                <MyBranchMobileOverview activeTab={activeTab} setActiveTab={setActiveTab} />
            ) : (
                <MyBranchDesktopOverview activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
        </>
    )
}