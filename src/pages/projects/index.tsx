import { PageTitle } from "@/components/PageTitle";
import type { TabItem } from "@/utils/types"
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react"
import OngoingProjects from "./components/OngoingProjects";
import CompletedProjects from "./components/CompletedProjects";

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

const MotionBox = motion.create(Box);

export default function ProjectsPage() {
    const [activeTab, setActiveTab] = useState<TabItem>(projectsTabs[0]);

    const handleTabChange = (tab: TabItem) => {
        setActiveTab(tab);
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={3}
        >
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
                    px={2}
                    py="1.25rem"
                >
                    {activeTab?.content}
                </MotionBox>
            </AnimatePresence>
        </Box>
    )
}