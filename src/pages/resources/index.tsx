import { PageTitle } from "@/components/PageTitle";
import type { TabItem } from "@/utils/types";
import { AnimatePresence, motion } from "motion/react";
import IdentityPage from "./aciu-identity";
import MeetingReportsPage from "./meeting-reports";
import { useSearchParams } from "react-router-dom";

const resourcesTabs: TabItem[] = [
    {
        key: "aciu-identity",
        label: "ACIU Identity",
        content: <IdentityPage />
    },
    {
        key: "meeting-reports",
        label: "Meeting Reports",
        content: <MeetingReportsPage />
    }
]


export default function ResourcesPage() {
    const [searchParams, setSearchParams] = useSearchParams()

    
    const activeTab = searchParams.get("tab") ?? resourcesTabs[0];
    const currentTab: TabItem = resourcesTabs.find(tab => tab.key === activeTab) ?? resourcesTabs[0];

    const handleTabChange = (tab: TabItem) => {
        setSearchParams({ tab: tab.key })
    }


    return (
        <div className="flex flex-col gap-6">
            <PageTitle
                title="ACIU Resources"
                tabs={resourcesTabs}
                activeTab={currentTab}
                onTabChange={handleTabChange}
            />
            <AnimatePresence>
                <motion.div
                    key={currentTab?.key + "-content"}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mx-5 mb-5 px-4 py-5 bg-white">
                        {currentTab?.content}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}