import { PageTitle } from "@/components/PageTitle";
import type { TabItem } from "@/utils/types"
import { AnimatePresence } from "motion/react";
import { useState } from "react"
import OngoingProjects from "./components/OngoingProjects";
import CompletedProjects from "./components/CompletedProjects";
import MotionBox from "@/components/MotionBox";

const projectsTabs: TabItem[] = [
    { 
        key: "ongoing-projects", 
        label: "Ongoing Projects", 
        content: <OngoingProjects />
    },
    { 
        key: "completed-projects", 
        label: "Completed Projects", 
        content: <CompletedProjects />
    }
]

export default function ProjectsPage() {
    const [activeTab, setActiveTab] = useState<TabItem>(projectsTabs[0]);

    const handleTabChange = (tab: TabItem) => {
        setActiveTab(tab);
    }

    return (
        <div className="flex flex-col gap-6">
            <PageTitle
                title="ACIU Projects"
                tabs={projectsTabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
            <AnimatePresence>
                <MotionBox
                    key={activeTab?.key + "-content"}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-white"
                    mx="1.25rem"
                    px={{
                        xs: ".5rem",
                        md: "1.625rem"
                    }}
                    py="1.25rem"
                >
                    {activeTab?.content}
                </MotionBox>
            </AnimatePresence>
        </div>
    )
}