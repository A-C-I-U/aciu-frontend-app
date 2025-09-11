import { PageTitle } from "@/components/PageTitle";
import UpcomingEvents from "./components/UpcomingEvents";
import { useState } from "react";
import type { TabItem } from "@/utils/types";
import PastEvents from "./components/PastEvents";

const eventsTabs: TabItem[] = [
    { key: "upcoming-events", label: "Upcoming Events", content: <UpcomingEvents /> },
    { key: "registered-events", label: "Registered Events", content: <UpcomingEvents /> },
    { key: "past-events", label: "Past Events", content: <PastEvents /> }
]

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState(eventsTabs[0]);
    const handleTabChange = (tab: TabItem) => {
        setActiveTab(tab);
    }

    return (
        <div className="flex flex-col gap-6">
            <PageTitle 
                title="ACIU Events" 
                tabs={eventsTabs} 
                activeTab={activeTab}
                onTabChange={handleTabChange} 
            />
            <div className="mx-5 px-4 py-5 bg-white">
                {activeTab?.content}
            </div>
        </div>
    )
}