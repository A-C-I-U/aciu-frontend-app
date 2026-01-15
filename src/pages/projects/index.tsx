import { PageTitle } from "@/components/PageTitle";
import type { TabItem } from "@/utils/types"
import { AnimatePresence } from "motion/react";
import { useMemo } from "react"
import OngoingProjects from "./components/tabs/OngoingProjects";
import CompletedProjects from "./components/tabs/CompletedProjects";
import MotionBox from "@/components/MotionBox";
import { useUser } from "@/context/UserContext";
import ProjectNominations from "./components/tabs/ProjectNominations";
import TabButton from "@/components/TabButton";
import { useProjectStats } from "@/services/hooks/project";
import { StatsCard } from "@/components/StatsCard";
import { useSearchParams } from "react-router-dom";

const baseTabs: TabItem[] = [
    { key: "ongoing-projects", label: "Ongoing Projects", content: <OngoingProjects />},
    { key: "completed-projects", label: "Completed Projects", content: <CompletedProjects />}
]

export default function ProjectsPage() {
    const { user } = useUser();
    const { data: projectStats, isLoading: isProjectStatsLoading, isError: isProjectStatsError } = useProjectStats()
    const [searchParams, setSearchParams] = useSearchParams();


    const projectTabs = useMemo(() => {
        if (user?.role === "national_admin") {
            return [
                ...baseTabs,
                { key: "project-nominations", label: "Project Nominations", content: <ProjectNominations />}
            ]
        }
        return baseTabs;
    }, [user?.role]);

    
    const activeTab = searchParams.get("tab") ?? projectTabs[0].key;
    const currentTab: TabItem = projectTabs.find(tab => tab.key === activeTab) ?? projectTabs[0];
    const handleTabChange = (tab: TabItem) => {
        setSearchParams({ tab: tab.key });
    }


    const totalProjectDonations = projectStats?.totalProjectDonations?.amount ?? 0;

    return (
        <div className="flex flex-col gap-6">
              {user?.role === "national_admin" ?
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row gap-4 mx-5 mt-6">
                        {isProjectStatsLoading || isProjectStatsError ? 
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
                                title="Approved Projects"
                                number={`${projectStats?.approvedProjects.count ?? 0}`}
                                rateOfChange={`${projectStats?.approvedProjects.growth}`}
                                description="All Time"
                            />
                            <StatsCard
                                title="Completed Projects"
                                number={`${projectStats?.completedProjects.count ?? 0}`}
                                rateOfChange={`${projectStats?.completedProjects.growth}`}
                                description="All Time"
                            />
                            <StatsCard
                                title="Ongoing Projects"
                                number={`${projectStats?.ongoingProjects.count ?? 0}`}
                                rateOfChange={`${projectStats?.ongoingProjects.growth}`}
                                description="All Time"
                            />
                            <StatsCard
                                title="Total Project Donations"
                                number={`N${totalProjectDonations.toLocaleString() ?? 0}`}
                                rateOfChange={`${projectStats?.totalProjectDonations.growth}`}
                                description="All Time"
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
                            {projectTabs.map((tab) => (
                            <TabButton
                                key={tab.key}
                                tab={tab}
                                active={tab === currentTab}
                                onClick={() => handleTabChange(tab)}
                            />
                            ))}
                        </nav>
                    </div>
                </div> :
            <PageTitle
                title="ACIU Projects"
                tabs={projectTabs}
                activeTab={currentTab}
                onTabChange={handleTabChange}
            /> }
            <AnimatePresence>
                <MotionBox
                    key={currentTab?.key + "-content"}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-white"
                    mx="1.25rem"
                    px={{
                        xs: ".5rem",
                        md: "1.625rem"
                    }}
                    py="1.25rem"
                >
                    {currentTab?.content}
                </MotionBox>
            </AnimatePresence>
        </div>
    )
}