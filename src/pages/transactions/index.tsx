import type { TabItem } from "@/utils/types";
import DuesPayment from "./components/tabs/DuesPayment";
import EventDonations from "./components/tabs/EventDonations";
import ProjectDonations from "./components/tabs/ProjectDonations";
import WithdrawalRequests from "./components/tabs/WithdrawalRequests";
import DuesManagement from "./components/tabs/DuesManagement";
import { useSearchParams } from "react-router-dom";
import { useTransactionsOverview } from "@/services/hooks/transactions";
import { StatsCard } from "@/components/StatsCard";
import TabButton from "@/components/TabButton";
import { AnimatePresence } from "motion/react";
import MotionBox from "@/components/MotionBox";

const transactionTabs: TabItem[] = [
    { key: "dues-payment", label: "Dues", content: <DuesPayment /> },
    { key: "event-donations", label: "Events", content: <EventDonations /> },
    { key: "project-donations", label: "Projects", content: <ProjectDonations /> },
    { key: "withdrawal-requests", label: "Withdrawal Requests", content: <WithdrawalRequests /> },
    { key: "dues-management", label: "Manage Dues", content: <DuesManagement /> }
]

export default function Transactions() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: transactionsOverview, isLoading: isTransactionsOverviewLoading, isError: isTransactionsOverviewError } = useTransactionsOverview();

    const activeTab = searchParams.get("tab") ?? transactionTabs[0];
    const currentTab: TabItem = transactionTabs.find(tab => tab.key === activeTab) ?? transactionTabs[0];

    const handleTabChange = (tab: TabItem) => {
        setSearchParams({ tab: tab.key })
    }
    return (
        <div className="flex flex-col gap-6">
            <>
                <div className="flex flex-col lg:flex-row gap-4 mx-5 mt-6">
                    {isTransactionsOverviewLoading || isTransactionsOverviewError ?
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
                            title="Total Inflows"
                            number={`N${transactionsOverview?.totalCashInflow ? Math.round(transactionsOverview?.totalCashInflow.amount).toLocaleString() : "0"}`}
                            description="All Time"
                            rateOfChange={`${transactionsOverview?.totalCashInflow.growth}`}
                        />
                        <StatsCard
                            title="Total Approved Withdrawals"
                            number={`N${transactionsOverview?.totalApprovedWithdrawals ? Math.round(transactionsOverview?.totalApprovedWithdrawals.amount).toLocaleString() : "0"}`}
                            description="All Time"
                            rateOfChange={`${transactionsOverview?.totalApprovedWithdrawals.growth}`}
                        />
                        <StatsCard
                            title="Net Balance (in system)"
                            number={`N${transactionsOverview?.netBalance ? Math.round(transactionsOverview.netBalance.amount).toLocaleString() : "0"}`}
                            description="All Time"
                            rateOfChange={`${transactionsOverview?.netBalance.growth}`}
                        />
                        <StatsCard
                            title="Transactions this month"
                            number={`${transactionsOverview?.transactionsThisMonth ? Math.round(transactionsOverview.transactionsThisMonth).toLocaleString() : "0"}`}
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
                        {transactionTabs.map((tab) => (
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
                >
                    {currentTab?.content}
                </MotionBox>
            </AnimatePresence>
        </div>
    )
}