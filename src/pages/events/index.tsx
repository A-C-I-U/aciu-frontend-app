import { PageTitle } from "@/components/PageTitle";
import UpcomingEvents from "./components/UpcomingEvents";
import { useMemo, useState } from "react";
import type { TabItem } from "@/utils/types";
import PastEvents from "./components/PastEvents";
import { motion, AnimatePresence } from "motion/react";
import { useUser } from "@/context/UserContext";
import AllEvents from "./components/AllEvents";
import { StatsCard } from "@/components/StatsCard";
import TabButton from "@/components/TabButton";
import { useEventsStats } from "@/services/hooks/events";
import RegisteredEvents from "./components/RegisteredEvents";

const baseTabs: TabItem[] = [
    { key: "upcoming-events", label: "Upcoming Events", content: <UpcomingEvents /> },
    { key: "registered-events", label: "Registered Events", content: <RegisteredEvents /> },
    { key: "past-events", label: "Past Events", content: <PastEvents /> }
];

export default function EventsPage() {
    const { user } = useUser();
    const { data, isLoading: isEventsStatsLoading } = useEventsStats();
    const eventStats = data?.stats;

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
                        {isEventsStatsLoading ? 
                        <>
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="w-full py-4 px-6 flex flex-col gap-4 rounded-lg bg-white h-39 animate-pulse"
                                >
                                    <div className="flex flex-col justify-between h-full">
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                </div>
                            ))}
                        </> : 
                        <>

                            <StatsCard
                                title="Total Events Hosted"
                                number={eventStats?.totalEvents ? eventStats.totalEvents.toLocaleString() : "0"}
                                rateOfChange={`${eventStats?.monthlyGrowth.events}`}
                                description="All Time"
                            />
                            <StatsCard
                                title="National Events"
                                number={eventStats?.totalNationalEvents ? eventStats.totalNationalEvents.toLocaleString() : "0"}
                                rateOfChange={`${eventStats?.monthlyGrowth.nationalEvents}`}
                                description="All Time"
                            />
                            <StatsCard
                                title="Branch Events"
                                number={eventStats?.totalBranchEvents ? eventStats.totalBranchEvents.toLocaleString() : "0"}
                                rateOfChange={`${eventStats?.monthlyGrowth.branchEvents}`}
                                description="All Time"
                            />
                            <StatsCard
                                title="Total Rsvps"
                                number={eventStats?.totalRSVPs ? eventStats.totalRSVPs.toLocaleString() : "0"}
                                rateOfChange={`${eventStats?.monthlyGrowth.rsvps}`}
                                description="All Time"
                            />
                        </>
                    }   
                    </div>
                    <nav 
                        role="tablist" 
                        className="flex gap-4 md:gap-8 items-center bg-white mx-5 rounded-lg md:px-6 px-2.5 pt-14"
                    >
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