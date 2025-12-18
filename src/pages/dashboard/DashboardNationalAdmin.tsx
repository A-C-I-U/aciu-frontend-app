import { StatsCard } from "@/components/StatsCard";
import { useNationalDashboardStats, useNationalDashboardWithdrawals } from "@/services/hooks/dashboard"
import { NavLink } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import TransactionsChart from "./components/TransactionsChart";
import { Divider } from "@mui/material";
import { ArrowDown2 } from "iconsax-react";
import WithdrawalRequestsTable from "./components/WithdrawalRequestTable";
import NationalAdminSkeleton from "./components/NationalAdminSkeleton";
import { columns } from "./components/columns";

const quickActions = [
    { label: "View Transactions", path: "/transactions" },
    { label: "View Projects", path: "/projects" },
    { label: "Create National Dues", path: "/transactions" },
    { label: "Create New Branch", path: "/database" },
    { label: "Review Blog Posts", path: "/blog-posts" },
    { label: "Upload Resources", path: "/resources" }
]


export default function DashboardNationalAdmin() {
    const { data: stats, isLoading: isStatsLoading } = useNationalDashboardStats();
    const { data: withdrawalsData, isLoading: isWithdrawalRequestsLoading } = useNationalDashboardWithdrawals();


    const withdrawalRequests = withdrawalsData
        ? withdrawalsData.data.map((transaction: any) => ({
                id: transaction.id,
                transactionId: transaction.TransactionID,
                branchName: transaction["Branch Name"],
                date: transaction.Date,
                amount: transaction.Amount,
                status: transaction.Status.toLowerCase(),
            }))
    : [];


    if (isStatsLoading || isWithdrawalRequestsLoading) return <NationalAdminSkeleton />

    return (
        <div className="flex flex-col gap-6 p-6 w-full">
            {stats &&
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <StatsCard 
                        title="Total Registered Members"
                        number={stats?.totalMembers ? stats.totalMembers.toLocaleString() : "0"}
                        rateOfChange={`${stats.growth.members}`}
                        description="All Time"
                    />
                    <StatsCard
                        title="Total Donations"
                        number={`N${stats.totalDonations.toLocaleString() ?? 0}`}
                        rateOfChange={`${stats.growth.donations}`}
                        description="All Time"
                    />
                    <StatsCard
                        title="Total Branches"
                        number={`${stats.totalBranches.toLocaleString() ?? 0}`}
                        rateOfChange={`${stats.growth.branches}`}
                        description="All Time"
                    />
                </div>
            }

            <div className="grid lg:grid-cols-[3fr_1fr] items-stretch gap-4 max-w-full">
                <div className="bg-white rounded-lg py-5.5 flex flex-col gap-6 max-w-full">
                    <div className="flex flex-col lg:flex-row gap-6.75 lg:gap-7 justify-between lg:items-center px-4 lg:px-8">
                        <h3 className="text-xl leading-[120%] text-aciu-border-grey font-bold">
                            Transactions
                        </h3>
                        <div className="flex items-center gap-4">
                            <LegendItem color="#00B686" label="Dues" />
                            <LegendItem color="#B0E8D9" label="Projects" />
                            <LegendItem color="#D9F7EA" label="Events" />
                        </div>
                        <div className="hidden lg:flex gap-2 items-center">
                            <button className="section-action-button">
                                2022
                                <ArrowDown2 color="#3E3E3E" size={12} />
                            </button>
                            <button className="section-action-button">
                                Monthly
                                <ArrowDown2 color="#3E3E3E" size={12} />
                            </button>
                        </div>
                    </div>
                    <Divider />
                    <div className="flex lg:hidden gap-2 items-center px-4 lg:px-8">
                        <button className="section-action-button">
                            2022
                            <ArrowDown2 color="#3E3E3E" size={24} />
                        </button>
                        <button className="section-action-button">
                            Monthly
                            <ArrowDown2 color="#3E3E3E" size={24} />
                        </button>
                    </div>
                    <div className="px-4 lg:px-8 max-w-full">
                        <TransactionsChart />
                    </div>
                </div>
                <div className="bg-white rounded-lg px-6 py-4.5 flex flex-col gap-6">
                    <p className="font-semibold leading-[120%] text-aciu-border-grey">
                        Quick Actions
                    </p>
                    <div className="flex flex-col gap-4">
                        {quickActions.map(({ label, path }, index) => (
                            <NavLink
                                key={index}
                                to={path}
                                    className={[
                                        "flex justify-between items-center rounded-sm py-2.5 px-3.5 border transition-colors",
                                        index % 2 === 0
                                        ? "bg-accent-100 border-accent-300"
                                        : "bg-primary-100 border-primary-300"
                                    ].join(" ")}>
                                    <>
                                        <span className="font-montserrat text-xs text-aciu-border-grey">
                                            {label}
                                        </span>
                                        <ArrowForwardIosRoundedIcon
                                            sx={{
                                                width: "1rem",
                                                height: "1rem",
                                                color: "#3E3E3E"
                                            }}
                                        />
                                    </>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white py-6 px-4">
                <WithdrawalRequestsTable 
                    data={withdrawalRequests}
                    columns={columns}
                />
            </div>
        </div>
    )
}

const LegendItem = ({ color, label }: { color: string, label: string }) => {
    return (
        <div className="flex items-center gap-2 text-sm leading-[140%] text-aciu-border-grey">
            <span
                className="w-3 h-3 inline-block rounded-sm"
                style={{ backgroundColor: color }}
            ></span>
            {label}
        </div>
    )
}