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
  clearSearchParams
}: BranchOverviewProps & { clearSearchParams: () => void }) {
  const [screen, setScreen] = useState<"overview" | "content">("overview");

  const handleOpenContent = (tab: TabItem) => {
    setActiveTab(tab);
    setScreen("content");
  };

  const handleBack = () => {
    setScreen("overview");
    clearSearchParams();
  }

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
      borderRadius=".625rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      {screen === "overview" && 
        isLoading || !overviewData ? <BranchDashboardSkeleton /> :
        !isLoading && overviewData && 
        <div className="w-full flex flex-col gap-6">
          
          
          <div className="bg-white w-full flex items-center justify-center py-6 px-7.5">
            

            
              <div className="flex flex-col gap-4 items-center">
                <BranchInitials branchName={`${overviewData.dashboard.branchTitle}`} />
                <h2 className="text-xl leading-[1.2] text-aciu-border-grey">
                  {overviewData.dashboard.branchTitle}
                </h2>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2.5 px-4 py-2.5 border border-aciu-light-grey rounded-2xs">
                    <People size={24} color="#00B686" />
                    <p className="leading-4.25 text-aciu-abriba font-medium">
                      {`${overviewData.dashboard.registeredMembers} registered members`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-2.5 border border-aciu-light-grey rounded-2xs">
                    <Verify size={24} color="#00B686" />
                    <p className="leading-4.25 text-aciu-abriba font-medium">
                      {`${overviewData.dashboard.isActive ? "Verified and Active" : "Inactive"}`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center text-sm">
                  <p className="text-aciu-abriba leading-[1.2]">Meeting Location</p>
                  <p className="font-medium text-aciu-border-grey leading-[1.2]">
                    {overviewData.dashboard.meetingLocation}
                  </p>
                </div>
                <button className="btn btn-primary max-w-35.5 leading-[1.55]">Locate on map</button>
              </div>
            
          </div>

          <div className="flex flex-col gap-4 justify-center w-full mx-auto">
            {branchTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleOpenContent(tab)}
                className="w-full flex justify-between items-center p-4.5 bg-white h-19 rounded-2xs"
              >
                <span className="text-sm font-medium font-montserrat text-aciu-abriba leading-5">
                  {tab.label}
                </span>
                <ArrowRight2 size={20} variant="Linear" color="#151515" />
              </button>
            ))}
          </div>
        </div>
        }
      
      {screen === "content" && activeTab && (
        <MotionBox
          key={activeTab?.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          bgcolor="#fff"
          borderRadius=".625rem"
          width="100%"
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
