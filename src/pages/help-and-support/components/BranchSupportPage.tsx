import type { TabItem } from "@/utils/types"
import { Box, Button, useMediaQuery } from "@mui/material"
import { ArrowLeft2, ArrowRight2, People, Verify } from "iconsax-react"
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


export default function BranchSupportPage({
    onBackToSupport
}: { onBackToSupport: () => void}) {
  const [activeTab, setActiveTab] = useState<TabItem | null>(branchSupportTabs[0]);
  const [screen, setScreen] = useState<"overview" | "content">("overview");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleOpenContent = (tab: TabItem) => {
    setActiveTab(tab);
    setScreen("content");
  };

  const handleBack = () => setScreen("overview");

  const isDesktop = !isMobile;

  return (
    <Box>
      {/* === DESKTOP === */}
      {isDesktop && (
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          borderRadius=".625rem"
          bgcolor="#fff"
          mx="1.25rem"
          py="1rem"
          display="flex"
          flexDirection="column"
          gap="2rem"
          position="relative"
        >
            <Button
                onClick={onBackToSupport}
                sx={{
                    color: "#00B686",
                    textTransform: "none",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: ".875rem",
                    mb: 2,
                    position: "absolute",
                    left: ".5rem"
                }}
            >
                <ArrowLeft2 size={20} color="#00B686" />
                <span className="ml-3">Back</span>
            </Button>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                px={{ xs: ".5rem", md: "1rem" }}
                alignItems="center"
                >
                <BranchInitials branchName="Lagos Branch" />
                <h2 className="text-xl font-coolvetica text-aciu-border-grey">
                    ACIU Lagos Mainland Branch
                </h2>

                <Box display="flex" gap={2} alignItems="center">
                    {[
                        { icon: People, stat: "172 registered members" },
                        { icon: Verify, stat: "Verified and Active" },
                    ].map(({ icon, stat }, i) => (
                        <StatTag key={i} icon={icon} stat={stat} />
                    ))}
                </Box>

                <Box textAlign="center" display="flex" flexDirection="column" gap=".5rem">
                    <p className="text-aciu-abriba font-montserrat">Meeting Location</p>
                    <p className="font-montserrat font-medium text-aciu-border-grey">
                        Community Hall, Bode Thomas Street, Surulere, Lagos State
                    </p>
                </Box>

                <Button
                    sx={{
                    padding: "1rem",
                    color: "white",
                    borderRadius: ".75rem",
                    backgroundColor: "#00B686",
                    fontFamily: "'Coolvetica', sans-serif",
                    textTransform: "unset",
                    }}
                >
                    Locate on map
                </Button>
            </Box>

            {/* Tabs */}
            <Box textAlign="center">
                <div className="flex gap-4 md:gap-8 justify-center w-full mx-auto">
                {branchSupportTabs.map((tab) => (
                    <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                        activeTab?.key === tab.key
                        ? "text-aciu-red font-semibold"
                        : "text-aciu-abriba font-medium pb-4"
                    } text-xs md:text-sm font-montserrat flex flex-col gap-4`}
                    >
                    {tab.label}
                    {activeTab?.key === tab.key && (
                        <span className="block w-full h-[2px] bg-aciu-red mt-2 rounded-full"></span>
                    )}
                    </button>
                ))}
                </div>
                <hr className="w-full border-t-[.5px] text-aciu-dark-grey" />
            </Box>

            <MotionBox
                key={activeTab?.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="px-4 mt-4"
            >
                {activeTab?.content}
            </MotionBox>
            </MotionBox>
        )}

        {/* === MOBILE === */}
        {!isDesktop && (
            <MotionBox
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            mx="1.25rem"
            mt={3}
            >
            {/* SCREEN 1: Overview */}
            {screen === "overview" && (
                <>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        alignItems="center"
                        bgcolor="#fff"
                        borderRadius=".625rem"
                        py={3}
                        px={3}
                    >
                        <BranchInitials branchName="Lagos Branch" />
                        <h2 className="text-xl font-coolvetica text-aciu-border-grey">
                        ACIU Lagos Mainland Branch
                        </h2>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <StatTag icon={People} stat="172 registered members" />
                            <StatTag icon={Verify} stat="Verified and Active" />
                        </Box>
                        <Box textAlign="center" display="flex" flexDirection="column" gap=".5rem">
                            <p className="text-aciu-abriba font-montserrat">Meeting Location</p>
                            <p className="font-montserrat font-medium text-aciu-border-grey">
                                Community Hall, Bode Thomas Street, Surulere, Lagos State
                            </p>
                        </Box>
                    </Box>

                    {/* Mobile Tabs */}
                    <Box display="flex" flexDirection="column" gap={2} mt={3} width="full">
                        {branchSupportTabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => handleOpenContent(tab)}
                                className="w-full flex justify-between items-center p-[1.125rem] bg-white h-[4.75rem] rounded-[.625rem]"
                                >
                                <span className="font-medium font-montserrat text-sm text-aciu-abriba leading-[140%]">
                                    {tab.label}
                                </span>
                                <ArrowRight2 size={20} variant="Linear" color="#151515" />
                            </button>
                        ))}
                    </Box>
                </>
            )}


          {/* SCREEN 2: Content */}
          {screen === "content" && activeTab && (
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              bgcolor="#fff"
              borderRadius=".625rem"
              py={3}
              px={2}
            >
              <Button
                onClick={handleBack}
                sx={{
                  color: "#00B686",
                  textTransform: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: ".875rem",
                  mb: 2,

                }}
              >
                <ArrowLeft2 size={20} color="#00B686" />
                <span className="ml-3">Back</span>
              </Button>
              {activeTab.content}
            </MotionBox>
          )}
        </MotionBox>
      )}
    </Box>
    )
}