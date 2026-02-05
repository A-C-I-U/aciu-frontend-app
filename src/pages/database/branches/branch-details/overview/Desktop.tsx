import MotionBox from "@/components/MotionBox";
import BranchInfoCard from "../BranchInfoCard";
import { StatsCard } from "@/components/StatsCard";
import { branchInfo, branchStats } from "@/utils/data";
import type { ExtendedTabItem } from "@/utils/types";
import { branchTabs } from "../BranchTabs";
import { Divider } from "@mui/material";
import { AnimatePresence } from "motion/react";
import TabButton from "@/components/TabButton";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BranchForm from "../../BranchForm";

export default function BranchDesktopOverview({
  activeTab,
  onTabChange,
}: {
  activeTab: ExtendedTabItem;
  onTabChange: (tab: ExtendedTabItem) => void;
}) {
  const [editOpen, setEditOpen] = useState(false);

  const { id: branchId } = useParams<{ id: string }>();

  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        borderRadius=".625rem"
        mx="1.25rem"
        py="1rem"
        display="flex"
        flexDirection="column"
        gap={3}
        position="relative"
      >
        <div className="relative flex flex-col gap-6">
          <BranchInfoCard onEditBranch={() => setEditOpen(true)} branchInfo={branchInfo} />
          <div className="grid lg:grid-cols-3 ml:grid-cols-5 gap-6">
            {branchStats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                number={`${(+stat.number).toLocaleString()}`}
                rateOfChange={stat.rateOfChange}
                currency={stat.currency}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl pb-5 w-full">
          <div className="overflow-x-auto">
            <div className="flex flex-nowrap gap-4 md:gap-8 px-4 pt-5">
              {branchTabs.map((tab) => (
                <TabButton
                  key={tab.key}
                  tab={tab}
                  active={tab === activeTab}
                  onClick={() => onTabChange(tab)}
                />
              ))}
            </div>
          </div>

          <Divider orientation="horizontal" className="text-aciu-dark-grey" flexItem />
          <AnimatePresence mode="wait">
            <MotionBox
              key={activeTab?.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              paddingY=".875rem"
            >
              {activeTab?.content}
            </MotionBox>
          </AnimatePresence>
        </div>
      </MotionBox>

      <BranchForm mode="edit" id={branchId} open={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
}
