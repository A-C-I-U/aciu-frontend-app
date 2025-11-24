import { PageTitle } from "@/components/PageTitle";
import UpcomingEvents from "./components/UpcomingEvents";
import { useState } from "react";
import type { TabItem } from "@/utils/types";
import PastEvents from "./components/PastEvents";
import { motion, AnimatePresence } from "motion/react";

const eventsTabs: TabItem[] = [
    { key: "upcoming-events", label: "Upcoming Events", content: <UpcomingEvents /> },
    { key: "registered-events", label: "Registered Events", content: <UpcomingEvents /> }, // You might want to create a separate component for this
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
            <AnimatePresence>
                <motion.div
                    key={activeTab?.key + "-content"}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mx-5 px-4 py-5 bg-white"
                    >
                    {activeTab?.content}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}