import MotionBox from "@/components/MotionBox";
import type { BranchOverviewProps } from "@/services/types/members";
import type { TabItem } from "@/utils/types";
import { ArrowLeft2, ArrowRight2, People, Verify } from "iconsax-react";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { branchTabs } from "..";
import { BranchInitials } from "@/pages/help-and-support/components/BranchInitials";
import BranchDashboardSkeleton from "../BranchDashboardSkeleton";

export default function MobileOverview({
  activeTab,
  setActiveTab,
  overviewData,
  isLoading,
}: BranchOverviewProps) {
  const [screen, setScreen] = useState<"overview" | "content">("overview");

  const handleOpenContent = (tab: TabItem) => {
    setActiveTab(tab);
    setScreen("content");
  };

  const handleBack = () => setScreen("overview");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  useEffect(() => {
    setScreen("overview");
  }, []);

  return (
    <MotionBox
      key={screen}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      mx="1.25rem"
      my={3}
      borderRadius=".625rem"
      display="flex"
        flexDirection="column"
        alignItems="center"
        gap="2rem"
        position="relative"
    >
      {screen === "overview" && (
        <div>
          <div className="bg-whitemax-w-124.5 w-full flex items-center justify-center py-8">
            {isLoading && <BranchDashboardSkeleton />}

            {!isLoading && overviewData && (
              <div className="flex flex-col gap-4 items-center">
                <BranchInitials branchName={`${overviewData.dashboard.branchTitle}`} />
                <h2 className="text-xl leading-[1.2] text-aciu-border-grey">
                  {overviewData.dashboard.branchTitle}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2.5 px-4 py-2.5 border border-aciu-light-grey rounded-2xs">
                    <People size={24} color="#00B686" />
                    <p className="leading-[1.2] text-aciu-abriba">
                      {`${overviewData.dashboard.registeredMembers} registered members`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-2.5 border border-aciu-light-grey rounded-2xs">
                    <Verify size={24} color="#00B686" />
                    <p className="leading-[1.2] text-aciu-abriba">
                      {`${overviewData.dashboard.isActive ? "Verified and Active" : "Inactive"}`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <p className="text-aciu-abriba leading-[1.2]">Meeting Location</p>
                  <p className="font-medium text-aciu-border-grey leading-[1.2]">
                    {overviewData.dashboard.meetingLocation}
                  </p>
                </div>
                <button className="btn btn-primary max-w-35.5 leading-[1.55]">Locate on map</button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 justify-center w-full mx-auto">
            {branchTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleOpenContent(tab)}
                className="w-full flex justify-between items-center p-4.5 bg-white h-19 rounded-2xs"
              >
                <span className="font-medium font-montserrat text-aciu-abriba leading-[140%]">
                  {tab.label}
                </span>
                <ArrowRight2 size={20} variant="Linear" color="#151515" />
              </button>
            ))}
          </div>
        </div>
      )}
      {screen === "content" && activeTab && (
        <MotionBox
          key={activeTab?.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          bgcolor="#fff"
          borderRadius=".625rem"
          py={3}
          px={{
            xs: 1,
            md: 2,
          }}
        >
          <div className="flex flex-col gap-6 w-full mb-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                aria-label="Go back to Branch Overview"
                title="Go back to Branch Overview"
                className="flex items-center text-aciu-neutral font-montserrat text-sm
                                    border border-neutrals-100 rounded-xl px-2 py-4 bg-transparent hover:bg-neutrals-50 transition-colors"
              >
                <ArrowLeft2 size={20} color="#898483" />
              </button>
              <div className="lg:pl-10 flex flex-col gap-2 max-h-fit">
                <p className="font-montserrat lg:text-xl font-semibold leading-5 text-aciu-border-grey">
                  {activeTab?.label}
                </p>
              </div>
            </div>
            <Divider orientation="horizontal" flexItem />
          </div>
          {activeTab.content}
        </MotionBox>
      )}
    </MotionBox>
  );
}
