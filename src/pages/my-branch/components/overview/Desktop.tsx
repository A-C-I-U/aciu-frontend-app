import MotionBox from "@/components/MotionBox";
import BranchInfoCard from "../BranchInfoCard";
import { StatsCard } from "@/components/StatsCard";
import type { ExtendedTabItem } from "@/utils/types";
import { myBranchTabs } from "../MyBranchTabs";
import { Divider, Skeleton } from "@mui/material";
import { AnimatePresence } from "motion/react";
import { useBranchDashboard, useBranchOverview } from "@/services/hooks/branch";

export default function MyBranchDesktopOverview({
    activeTab, setActiveTab
}: { activeTab: ExtendedTabItem, setActiveTab: (tab: ExtendedTabItem) => void }) {

    const { data: dashboardData, isLoading: isDashboardLoading } = useBranchDashboard();
    const { data: overviewData, isLoading: isOverviewLoading } = useBranchOverview();

    const stats = [
        {
            title: "Total Verified Members",
            number: dashboardData?.totalVerifiedMembers.toString() || "0",
            rateOfChange: "12.5" // Hardcoded for now as API doesn't provide it
        },
        {
            title: "Active Age Grades",
            number: dashboardData?.activeAgeGrades.toString() || "0",
            rateOfChange: "12.5"
        },
        {
            title: "Pending Verification",
            number: dashboardData?.pendingVerifications.toString() || "0",
            rateOfChange: "33"
        },
        {
            title: "Total Withdrawals",
            number: dashboardData?.totalWithdrawals.toLocaleString() || "0",
            rateOfChange: "0",
            currency: "₦"
        },
        {
            title: "Total Dues Collected",
            number: dashboardData?.totalDuesCollected.toLocaleString() || "0",
            rateOfChange: "10.2",
            currency: "₦"
        }
    ];

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
                {isOverviewLoading ? (
                    <Skeleton variant="rectangular" height={200} className="w-full rounded-[.625rem]" />
                ) : (
                    <BranchInfoCard branchInfo={overviewData} />
                )}

                <div className="grid lg:grid-cols-3 ml:grid-cols-5 gap-6">
                    {isDashboardLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} variant="rectangular" height={140} className="w-full rounded-2xl" />
                        ))
                    ) : (
                        stats.map((stat, index) => (
                            <StatsCard
                                key={index}
                                title={stat.title}
                                number={stat.number}
                                rateOfChange={stat.rateOfChange}
                                currency={stat.currency}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl pb-5 w-full">
                <div className="overflow-x-auto">
                    <div className="flex flex-nowrap gap-4 md:gap-8 px-4 pt-5">
                        {myBranchTabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab)}
                                className={`${activeTab?.key === tab.key
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