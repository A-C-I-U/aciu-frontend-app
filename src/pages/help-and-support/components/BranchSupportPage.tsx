import type { TabItem } from "@/utils/types"
import { Box, Button, Divider, useMediaQuery } from "@mui/material"
import { ArrowLeft2, ArrowRight2, People, Verify } from "iconsax-react"
import { motion } from "motion/react"
import { useState } from "react"
import { BranchInitials } from "./BranchInitials"
import { StatTag } from "./BranchStatTag"
import { BranchLeadershipTab } from "./BranchLeadershipTab"
import EventsList from "@/pages/events/components/EventsList"
import type { BranchSearchResponse } from "@/services/types/helpandsupport"

const MotionBox = motion.create(Box)

interface BranchSupportPageProps {
  onBackToSupport: () => void
  branchData?: BranchSearchResponse
}

export default function BranchSupportPage({
  onBackToSupport, 
  branchData
}: BranchSupportPageProps) {
  const [activeTab, setActiveTab] = useState<TabItem | null>(null);
  const [screen, setScreen] = useState<"overview" | "content">("overview");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const branchSupportTabs: TabItem[] = [
    { 
      key: "branch-leadership",
      label: "Branch Leadership", 
      content: <BranchLeadershipTab leadership={branchData?.leadership || []} />
    },
    {
      key: "branch-events",
      label: "Branch Events",
      content: (
        <div className="flex flex-col gap-4 lg:gap-8">
          <EventsList events={branchData?.events || []} />
        </div>
      )
    }
  ]

  if (!activeTab && branchSupportTabs.length > 0) {
    setActiveTab(branchSupportTabs[0]);
  }

  const handleOpenContent = (tab: TabItem) => {
    setActiveTab(tab);
    setScreen("content");
  };

  const handleBack = () => setScreen("overview");

  const isDesktop = !isMobile;

  const branchCity = branchData?.branchCity ||  "Branch";
  const meetingLocation = branchData?.meetingLocation ||  "Branch Location";
  const registeredUsersCount = branchData?.registeredUsersCount ||  0;

  return (
    <div>
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
               <button
                    type="button"
                    onClick={onBackToSupport}
                    className="absolute left-4 mb-2 flex items-center text-aciu-neutral font-montserrat text-sm
                        border border-neutrals-100 rounded-xl px-4 py-4 bg-transparent hover:bg-neutrals-50 transition-colors"
                >
                    <ArrowLeft2 size={20} color="#898483" />
                    <span className="ml-3">Go Back</span>
                </button>

                <div className="flex flex-col gap-2 px-2 md:px-4 items-center">
                    <BranchInitials branchName={branchCity} />
                    <h2 className="text-xl font-coolvetica text-aciu-border-grey">
                        ACIU {branchCity}
                    </h2>

                    <div className="flex items-center gap-2">
                    {[
                        { 
                          icon: People, 
                          stat: `${registeredUsersCount} registered member${registeredUsersCount !== 1 ? 's' : ''}` 
                        },
                        { icon: Verify, stat: "Verified and Active" },
                    ].map(({ icon, stat }, i) => (
                        <StatTag key={i} icon={icon} stat={stat} />
                    ))}
                    </div>

                    <div className="flex flex-col gap-2 text-center">
                        <p className="text-aciu-abriba">Meeting Location</p>
                        <p className="font-medium text-aciu-border-grey">
                            {meetingLocation}
                        </p>
                    </div>

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
                </div>

                {/* Tabs */}
                <div className="text-center">
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
                                    <span className="block w-full h-0.5 bg-aciu-red mt-2 rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </div>
                    <Divider orientation="horizontal" className="text-aciu-dark-grey" flexItem />
                </div>

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
                    <div className="relative">
                        <button
                            type="button"
                            onClick={onBackToSupport}
                            className="absolute left-4 top-4 mb-2 flex items-center text-aciu-neutral font-montserrat text-xs
                                border border-neutrals-100 rounded-xl px-2 py-2 bg-transparent hover:bg-neutrals-50 transition-colors"
                        >
                            <ArrowLeft2 size={18} color="#898483" />
                        </button>
                        <div className="flex flex-col gap-2 items-center bg-white rounded-[0.625rem] py-3 px-3">
                            <BranchInitials branchName={branchCity} />
                            <h2 className="text-xl font-coolvetica text-aciu-border-grey">
                                ACIU {branchCity}
                            </h2>
                            <div className="flex flex-col gap-2">
                                <StatTag 
                                  icon={People} 
                                  stat={`${registeredUsersCount} registered member${registeredUsersCount !== 1 ? 's' : ''}`} 
                                />
                                <StatTag icon={Verify} stat="Verified and Active" />
                            </div>
                            <div className="flex flex-col gap-2 text-center">
                                <p className="text-aciu-abriba">Meeting Location</p>
                                <p className="font-medium text-aciu-border-grey">
                                    {meetingLocation}
                                </p>
                            </div>
                        </div>

                        {/* Mobile Tabs */}
                        <div className="flex flex-col gap-2 mt-3 w-full">
                            {branchSupportTabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => handleOpenContent(tab)}
                                    className="w-full flex justify-between items-center p-4.5 bg-white h-19 rounded-[.625rem]"
                                >
                                    <span className="font-medium font-montserrat text-sm text-aciu-abriba leading-[140%]">
                                        {tab.label}
                                    </span>
                                    <ArrowRight2 size={20} variant="Linear" color="#151515" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* SCREEN 2: Content */}
                {screen === "content" && activeTab && (
                    <MotionBox
                        key={activeTab?.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        bgcolor="#fff"
                        borderRadius=".625rem"
                        py={3}
                        px={2}
                    >
                       <button
                            type="button"
                            onClick={handleBack}
                            className="md:absolute left-4 mb-2 flex items-center text-aciu-neutral font-montserrat text-sm
                                border border-neutrals-100 rounded-xl p-2 md:p-4 bg-transparent hover:bg-neutrals-50 transition-colors"
                        >
                            <ArrowLeft2 size={isDesktop ? 20 : 18} color="#898483" />
                            <span className="ml-3 hidden lg:inline-block">Go Back</span>
                        </button>
                        {activeTab.content}
                    </MotionBox>
                )}
            </MotionBox>
        )}
    </div>
  )
}