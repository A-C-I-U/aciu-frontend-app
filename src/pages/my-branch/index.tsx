import type { ExtendedTabItem } from "@/utils/types";
import { useEffect, useState } from "react";
import { myBranchTabs } from "./components/MyBranchTabs";
import { useMediaQuery } from "@mui/material";
import MyBranchMobileOverview from "./components/overview/Mobile";
import MyBranchDesktopOverview from "./components/overview/Desktop";
import { useLocation } from "react-router-dom";
import SuccessfulEventCreation from "./components/tabs/branch-events/add-event/SuccessfulCreation";

export default function MyBranchPage() {
    const isMedium = useMediaQuery("(max-width: 1024px)");
    const [activeTab, setActiveTab] = useState<ExtendedTabItem>(myBranchTabs[0])
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
                <MyBranchMobileOverview activeTab={activeTab} setActiveTab={setActiveTab} />
            ) : (
                <MyBranchDesktopOverview activeTab={activeTab} setActiveTab={setActiveTab} />
            )}

             {/* `SuccessfulEventCreation` dialog should be triggered immediately an event is created
                * Possibly by backend query since it requires the title of the event just created and can not
                * live within the add event page, it must be rendered here due to `useLocation`
                */}
            <SuccessfulEventCreation
                eventTitle={eventTitle}
                open={openEventsSuccessDialog}
                onClose={() => setEventsSuccessOpenDialog(false)}
            />
        </>
    )
}