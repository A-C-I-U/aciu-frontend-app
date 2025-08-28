import { useUser } from "@/context/UserContext"
import { CustomCountdown } from "@/components/MonthlyCountdown";
import { ProfileCard } from "@/components/ProfileCard";
import { EventsCard } from "@/components/EventsCard";
import { MetricsCard } from "@/components/MetricsCard";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
    const { user } = useUser();
    const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-lg font-bold font-coolvetica text-aciu-border-grey">
                Hi, {user?.name}! Welcome Back
            </h1>
            <section className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto items-stretch gap-3 w-full">
                <ProfileCard />
                <div className="flex flex-col gap-4 items-center w-full">
                    <div className="flex flex-col lg:flex-row gap-[1.375rem] items-center w-full">
                        {dashboardMetrics.map(({ title, price, timeStamp, trend }) => (
                            <MetricsCard
                                title={title}
                                price={price}
                                timeStamp={timeStamp}
                                trend={trend}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col gap-6 md:flex-row md:gap-0 justify-between items-center bg-white rounded-md px-6 py-[3.125rem] w-full">
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-montserrat text-aciu-abriba">
                                Your Next Monthly Dues:
                                <span className="px-2 font-semibold text-lg text-aciu-border-grey">
                                    N15000
                                </span>
                            </p>
                            <div className="bg-aciu-light-red">
                                <CustomCountdown targetDate={nextMonth} variant="inline" />
                            </div>
                        </div>
                         <NavLink
                            to="/my-payments"
                            className="bg-aciu-red p-4 rounded-xl min-w-[9rem] text-center"
                            >
                            <span className="font-coolvetica text-white">
                                Pay now
                            </span>
                        </NavLink>
                    </div>
                </div>
            </section>
            <section>
                <EventsCard />
            </section>
        </div>
    )
}

const dashboardMetrics = [
    { title: "Monthly Contributions", price: "45000", timeStamp: "Last Month", trend: "12.5%" },
    { title: "Project Donations", price: "280000", timeStamp: "Last Month", trend: "-12.5%" }
]


