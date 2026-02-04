import MotionBox from "@/components/MotionBox";
import type { ExtendedTabItem, TabItem } from "@/utils/types";
import BranchInfoCard from "../BranchInfoCard";
import { StatsCard } from "@/components/StatsCard";
import { branchTabs } from "../BranchTabs";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { branchInfo, branchStats } from "@/utils/data";
import BranchForm from "../../BranchForm";
import { useParams } from "react-router-dom";

export default function BranchMobileOverview({
  activeTab,
  onTabChange,
}: {
  activeTab: ExtendedTabItem;
  onTabChange: (tab: ExtendedTabItem) => void;
}) {
  const [screen, setScreen] = useState<"overview" | "content">("overview");
  const [editOpen, setEditOpen] = useState(false);

  const { id: branchId } = useParams<{ id: string }>();

  const handleOpenContent = (tab: TabItem) => {
    onTabChange(tab);
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
    <>
      <MotionBox
        key={screen}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        mx="1.25rem"
        my={3}
      >
        {screen === "overview" && (
          <div className="relative flex flex-col gap-5.5">
            <BranchInfoCard onEditBranch={() => setEditOpen(true)} branchInfo={branchInfo} />
            {branchStats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                number={`${(+stat.number).toLocaleString()}`}
                rateOfChange={stat.rateOfChange}
                currency={stat.currency}
              />
            ))}
            <div className="flex flex-col gap-4 justify-center w-full mx-auto">
              {branchTabs.map((tab: ExtendedTabItem) => (
                <button
                  key={tab.key}
                  onClick={() => handleOpenContent(tab)}
                  className="w-full flex justify-between items-center p-4.5 bg-white h-19 rounded-2xs"
                >
                  <span className="font-medium text-aciu-abriba leading-[1.4]">{tab.label}</span>
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
                  aria-label="Go back to My Branch Overview"
                  title="Go back to My Branch Overview"
                  className="flex items-center text-aciu-neutral font-montserrat text-sm
                                    border border-neutrals-100 rounded-xl px-2 py-4 bg-transparent hover:bg-neutrals-50 transition-colors"
                >
                  <ArrowLeft2 size={20} color="#898483" />
                </button>
                <div className="lg:pl-10 flex flex-col gap-2 max-h-fit">
                  <p className="font-montserrat lg:text-xl font-semibold leading-5 text-aciu-border-grey">
                    {activeTab?.label}
                  </p>
                  <p className="text-sm lg:text-base">{activeTab?.contentDescription}</p>
                </div>
              </div>
              <Divider orientation="horizontal" flexItem />
            </div>
            {activeTab.content}
          </MotionBox>
        )}
      </MotionBox>
      <BranchForm mode="edit" id={branchId} open={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
}
