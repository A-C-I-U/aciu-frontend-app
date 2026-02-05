import MotionBox from "@/components/MotionBox";
import { StatsCard } from "@/components/StatsCard";
import TabButton from "@/components/TabButton";
import type { TabItem } from "@/utils/types";
import { AnimatePresence } from "motion/react";
import { useSearchParams } from "react-router-dom";
import Members from "./members";
import Branches from "./branches";
import AgeGrades from "./age-grades";
import { useDatabaseOverview } from "@/services/hooks/database";

const databaseTabs: TabItem[] = [
    { key: 'members', label: 'Members', content: <Members /> },
    { key: 'branches', label: 'Branches', content: <Branches /> },
    { key: 'age-grades', label: 'Age Grades', content: <AgeGrades /> }
]

export default function Database() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading: isDatabaseOverviewLoading, isError: isDatabaseOverviewError } = useDatabaseOverview();
    
    const activeTab = searchParams.get("tab") ?? databaseTabs[0];
    const currentTab: TabItem = databaseTabs.find(tab => tab.key === activeTab) ?? databaseTabs[0];

    const handleTabChange = (tab: TabItem) => {
        setSearchParams({ tab: tab.key })
    }

    const overview = {
        members: {
            value: (data?.totals.members ?? 0).toLocaleString(),
            growth: String(data?.growth.members ?? 0),
        },
        verifiedMembers: {
            value: (data?.totals.verifiedMembers ?? 0).toLocaleString(),
            growth: String(data?.growth.verifiedMembers ?? 0),
        },
        branches: {
            value: (data?.totals.branches ?? 0).toLocaleString(),
            growth: String(data?.growth.branches ?? 0),
        },
        ageGrades: {
            value: (data?.totals.ageGrades ?? 0).toLocaleString(),
            growth: String(data?.growth.ageGrades ?? 0),
        },
    }

    return (
                <div className="flex flex-col gap-6">
            <>
                <div className="flex flex-col lg:flex-row gap-4 mx-5 mt-6">
                    {isDatabaseOverviewLoading || isDatabaseOverviewError ?
                    <>
                        {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="w-full py-4 px-6 flex flex-col gap-4 rounded-lg bg-white h-39 animate-pulse"
                                >
                                    <div className="flex flex-col justify-between h-full">
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                </div>
                            ))}
                    </> :
                    <>
                        <StatsCard
                            title="Total Members"
                            number={overview.members.value}
                            description="All Time"
                            rateOfChange={overview.members.growth}
                        />
                        <StatsCard
                            title="Verified Members"
                            number={overview.verifiedMembers.value}
                            description="All Time"
                            rateOfChange={overview.verifiedMembers.growth}
                        />
                        <StatsCard
                            title="Total Branches"
                            number={overview.branches.value}
                            description="All Time"
                            rateOfChange={`${overview.branches.growth}`}
                        />
                        <StatsCard
                            title="Total Age Grades"
                            number={overview.ageGrades.value}
                            description="All Time"
                            rateOfChange={overview.ageGrades.growth}
                        />
                    </>
                }
                </div>
                <div className="relative">
                    <nav
                        id="nav-tabs"
                        role="tablist"
                        className="flex gap-4 md:gap-8 items-center bg-white mx-5 rounded-lg md:px-6 px-2.5 pt-14 overflow-x-auto no-scrollbar"
                    >
                        {databaseTabs.map((tab) => (
                            <TabButton
                                key={tab.key}
                                tab={tab}
                                active={tab === currentTab}
                                onClick={() => handleTabChange(tab)}
                            />
                        ))}
                    </nav>
                </div>
            </>
            <AnimatePresence>
                <MotionBox
                    key={currentTab?.key + "-content"}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    mx="1.25rem"
                    bgcolor="white"
                >
                    {currentTab?.content}
                </MotionBox>
            </AnimatePresence>
        </div>
    )
}