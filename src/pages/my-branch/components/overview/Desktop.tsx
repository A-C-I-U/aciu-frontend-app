import MotionBox from "@/components/MotionBox";
import BranchInfoCard from "../BranchInfoCard";
import { StatsCard } from "@/components/StatsCard";
import { branchInfo, branchStats } from "@/utils/data";
import type { ExtendedTabItem } from "@/utils/types";
import { myBranchTabs } from "../MyBranchTabs";
import { Divider } from "@mui/material";
import { AnimatePresence } from "motion/react";

export default function MyBranchDesktopOverview({
    activeTab, setActiveTab
}: { activeTab: ExtendedTabItem, setActiveTab: (tab: ExtendedTabItem) => void }) {
    return (
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
                <BranchInfoCard branchInfo={branchInfo}/>
                <div className="grid mlg:grid-cols-3 ml:grid-cols-5 gap-6">
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

            <div className="bg-white rounded-xl pb-5">
                <div className="flex gap-4 md:gap-8 justify-start w-full mx-auto px-4 pt-5">
                    {myBranchTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab)}
                            className={`${
                                activeTab?.key === tab.key
                                ? "text-aciu-red font-semibold"
                                : "text-aciu-abriba font-medium pb-4"
                            } text-xs md:text-sm font-montserrat flex flex-col gap-2`}
                        >
                            {tab.label}
                            {activeTab?.key === tab.key && (
                                <span className="block w-full h-0.5 bg-aciu-red mt-2 rounded-full"></span>
                            )}
                        </button>
                    ))}
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
    )
}