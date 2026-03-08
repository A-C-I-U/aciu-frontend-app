import type { ExtendedTabItem } from "@/utils/types";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import MyBranchMobileOverview from "./components/overview/Mobile";
import MyBranchDesktopOverview from "./components/overview/Desktop";
import { useLocation, useSearchParams } from "react-router-dom";
import { myBranchTabs } from "./components/MyBranchTabs";

export default function MyBranchPage() {
    const isMedium = useMediaQuery("(max-width: 1024px)");
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") ?? myBranchTabs[0];
    const currentTab: ExtendedTabItem =
        myBranchTabs.find((tab) => tab.key === activeTab) ?? myBranchTabs[0];

    const handleTabChange = (tab: ExtendedTabItem) => {
    setSearchParams({ tab: tab.key });
    };

    const [openEventsSuccessDialog, setEventsSuccessOpenDialog] = useState(false);
    const location = useLocation();
    const eventTitle = location.state?.eventTitle;

    useEffect(() => {
        if (eventTitle) {
            setEventsSuccessOpenDialog(true);
        }
    }, [eventTitle]);
    
    return (
        <>
            {isMedium ? (
                <MyBranchMobileOverview activeTab={currentTab} setActiveTab={handleTabChange} />
            ) : (
                <MyBranchDesktopOverview activeTab={currentTab} setActiveTab={handleTabChange} />
            )}
            
        </>
    )
}