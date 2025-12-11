import { StatsCard } from "@/components/StatsCard";
import { useNationalDashboardStats } from "@/services/hooks/dashboard"
import { NavLink } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const quickActions = [
    { label: "View Transactions", path: "/transactions" },
    { label: "View Projects", path: "/projects" },
    { label: "Create National Dues", path: "/transactions" },
    { label: "Create New Branch", path: "/database" },
    { label: "Review Blog Posts", path: "/blog-posts" },
    { label: "Upload Resources", path: "/resources" }
]


export default function DashboardNationalAdmin() {
    const { data: stats } = useNationalDashboardStats();

    return (
        <div className="flex flex-col gap-6">
            {stats &&
                <div className="flex gap-4 items-center">
                    <StatsCard 
                        title="Total Registered Members"
                        number={`${stats.totalMembers.toLocaleString()}`}
                        rateOfChange={`${stats.growth.members}`}
                        description="All Time"
                    />
                    <StatsCard
                        title="Total Donations"
                        number={`N${stats.totalDonations.toLocaleString()}`}
                        rateOfChange={`${stats.growth.donations}`}
                        description="All Time"
                    />
                    <StatsCard
                        title="Total Branches"
                        number={stats.totalBranches.toLocaleString()}
                        rateOfChange={`${stats.growth.branches}`}
                        description="All Time"
                    />
                </div>
            }

            <div className="flex justify-between items-center">
                <div></div>
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
        </div>
    )
}