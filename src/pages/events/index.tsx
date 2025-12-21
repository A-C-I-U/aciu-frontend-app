import { PageTitle } from "@/components/PageTitle";
import UpcomingEvents from "./components/UpcomingEvents";
import { useMemo, useState } from "react";
import type { TabItem } from "@/utils/types";
import PastEvents from "./components/PastEvents";
import { motion, AnimatePresence } from "motion/react";
import { useUser } from "@/context/UserContext";
import AllEvents from "./components/AllEvents";
import RegisteredEvents from "./components/RegisteredEvents";
import { StatsCard } from "@/components/StatsCard";
import TabButton from "@/components/TabButton";

const baseTabs: TabItem[] = [
    { key: "upcoming-events", label: "Upcoming Events", content: <UpcomingEvents /> },
    { key: "registered-events", label: "Registered Events", content: <RegisteredEvents /> },
    { key: "past-events", label: "Past Events", content: <PastEvents /> }
];

export default function EventsPage() {
    const { user } = useUser();

    const tabs = useMemo(() => {
        if (user?.role === "national_admin") {
            return [
            { key: "all-events", label: "All Events", content: <AllEvents /> },
            ...baseTabs.filter((tab) => tab.key !== "registered-events"),
            ];
        }
        return baseTabs;
    }, [user?.role]);

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabChange = (tab: TabItem) => {
        setActiveTab(tab);
    }

    return (
        <div className="flex flex-col gap-6">
            {user?.role === "national_admin" ?
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row gap-4 mx-5 mt-6">
                        <StatsCard
                            title="Total Events Hosted"
                            number="145"
                            rateOfChange="0"
                            description="All Time"
                        />
                        <StatsCard
                            title="National Events"
                            number="38"
                            rateOfChange="0"
                            description="All Time"
                        />
                        <StatsCard
                            title="Branch Events"
                            number="27"
                            rateOfChange="0"
                            description="All Time"
                        />
                        <StatsCard
                            title="Total Rsvps"
                            number="24,600"
                            rateOfChange="0"
                            description="All Time"
                        />
                    </div>
                    <nav role="tablist" className="flex gap-4 md:gap-8 items-center bg-white mx-5 rounded-lg md:px-6 px-2.5 pt-14">
                        {tabs.map((tab) => (
                            <TabButton 
                                tab={tab} 
                                active={tab === activeTab} 
                                onClick={() => handleTabChange(tab)} 
                            />
                        ))}
                    </nav>
                    
                </div>
                :
                <PageTitle 
                    title="ACIU Events" 
                    tabs={tabs} 
                    activeTab={activeTab}
                    onTabChange={handleTabChange} 
                />
            }
            
            
            <AnimatePresence>
                <motion.div
                    key={activeTab?.key + "-content"}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mx-5 px-4 py-5 bg-white min-h-[75dvh] mb-10"
                >
                    {activeTab?.content}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}