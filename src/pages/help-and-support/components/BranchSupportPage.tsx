import type { TabItem } from "@/utils/types"
import { Box, Button } from "@mui/material"
import { People, Verify } from "iconsax-react"
import { motion } from "motion/react"
import { useState } from "react"
import { BranchInitials } from "./BranchInitials"
import { StatTag } from "./BranchStatTag"
import { BranchLeadershipTab } from "./BranchLeadershipTab"
import EventsList from "@/pages/events/components/EventsList"

const MotionBox = motion(Box)

const branchSupportTabs: TabItem[] = [
    { 
        key: "branch-leadership",
        label: "Branch Leadership",
        content: <BranchLeadershipTab />
    },
    {
        key: "branch-events",
        label: "Branch Events",
        content: (
            <div className="flex flex-col gap-4 lg:gap-8">
                <EventsList />
            </div>
        )
    }
]


export default function BranchSupportPage() {
    const [activeTab, setActiveTab] = useState(branchSupportTabs[0]);

    const handleTabChange = (tab: TabItem) => {
        setActiveTab(tab);
    }

    return (
        <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            borderRadius=".625rem"
            bgcolor="#fff"
            mx="1.25rem"
            paddingY="1rem"
            display="flex"
            flexDirection="column"
            gap="2rem"
        >
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                paddingX={{
                    xs: ".5rem",
                    md: "1rem"
                }}
                alignItems="center"
            >
                <BranchInitials branchName="Lagos Branch" />
                <h2
                    className="text-xl font-coolvetica text-aciu-border-grey">
                        ACIU Lagos Mainland Branch
                </h2>
                <Box
                    display="flex"
                    gap={2}
                    alignItems="center"
                >
                    {[
                        { icon: People, stat: "172 registered members" },
                        { icon: Verify, stat: "Verified and Active" },
                        ].map(({ icon, stat }, index) => (
                            <StatTag
                                key={index}
                                icon={icon}
                                stat={stat}
                            />
                    ))}
                </Box>
                <Box
                    display="flex"
                    gap=".5rem"
                    flexDirection="column"
                    alignItems="center"
                >
                    <p className="text-aciu-abriba font-montserrat">
                        Meeting Location
                    </p>
                    <p className="font-montserrat font-medium text-aciu-border-grey leading-[120%]">
                        Community Hall, Bode Thomas Street, Surulere, Lagos State
                    </p>
                </Box>

                <Button
                    sx={{
                        padding: "1rem",
                        color: "white",
                        borderRadius: ".75rem",
                        transition: "all 0.2s ease-out",
                        fontFamily: "'Coolvetica', sans-serif",
                        fontWeight: 500,
                        backgroundColor: "#00B686",
                        textTransform: "unset"
                    }}
                >
                    Locate on map
                </Button>
            </Box>

            <div>
                <div className="flex gap-4 md:gap-8 items-center justify-center w-full mx-auto">
                    {branchSupportTabs.map((tab) => (
                        <button 
                            key={tab?.key}
                            onClick={() => handleTabChange(tab)}
                            className={`
                                ${activeTab?.key === tab?.key ? 
                                    'text-aciu-red font-semibold' : 
                                    'text-aciu-abriba font-medium pb-4'} 
                            text-xs md:text-sm font-montserrat flex flex-col gap-4`}
                        >
                            {tab?.label}
                            {activeTab?.key === tab?.key && (
                                <span className="block w-full h-[2px] bg-aciu-red mt-2 rounded-full"></span>
                            )}
                        </button>
                    ))}
                </div>
                <div className="w-full">
                    <hr className="w-full border-t-[.5px] text-aciu-dark-grey" color="#C9C9C9"/>
                </div>

                <MotionBox
                    key={activeTab?.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-4 mt-4"
                >
                    {activeTab?.content}
                </MotionBox>
            </div>
        </MotionBox>
    )
}