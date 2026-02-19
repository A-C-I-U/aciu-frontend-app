import MotionBox from "@/components/MotionBox";
import { BranchInitials } from "@/pages/help-and-support/components/BranchInitials";
import { Divider } from "@mui/material";
import { People, Verify } from "iconsax-react";
import { branchTabs } from "..";
import type { BranchOverviewProps } from "@/services/types/members";
import BranchDashboardSkeleton from "../BranchDashboardSkeleton";

export default function Desktop({
  activeTab,
  setActiveTab,
  overviewData,
  isLoading,
}: BranchOverviewProps) {
  return (
    <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        borderRadius=".625rem"
        bgcolor="#fff"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="2rem"
        position="relative"
    >
      <div className="max-w-124.5 w-full flex items-center justify-center py-8">
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

      <div className="overflow-x-auto w-full text-center">
        <div className="flex items-center justify-center flex-nowrap gap-8">
          {branchTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab?.key === tab.key
                  ? "text-aciu-red font-semibold"
                  : "text-aciu-abriba font-medium pb-4"
              } text-xs md:text-sm font-montserrat flex flex-col gap-2 whitespace-nowrap`}
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
      
      <div className="py-6">{activeTab?.content}</div>
    </MotionBox>
  );
}
