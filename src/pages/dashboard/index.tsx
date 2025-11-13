import { useUser } from "@/context/UserContext"
import { ProfileCard } from "@/components/ProfileCard";
import { MetricsCard } from "@/components/MetricsCard";
import PaymentReminderCard from "@/components/PaymentReminderCard";
import { UpcomingEventsSection } from "./components/UpcomingEventsSection";

const dashboardMetrics = [
    { title: "Monthly Contributions", price: "45000", timeStamp: "Last Month", trend: "12.5%" },
    { title: "Project Donations", price: "280000", timeStamp: "Last Month", trend: "-12.5%" }
]

export default function Dashboard() {
    const { user } = useUser();
    const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-lg font-bold font-coolvetica text-aciu-border-grey">
                Hi, {user?.name}! Welcome Back
            </h1>
            <section className="grid lg:grid-cols-2 auto-rows-auto gap-3 w-full">
                <ProfileCard />
                <div className="flex flex-col gap-4 items-center w-full h-full">
                    <div className="flex flex-col lg:flex-row gap-5.5 items-stretch w-full">
                        {dashboardMetrics.map((metric, index) => (
                            <MetricsCard
                                key={index}
                                metric={metric}
                            />
                        ))}
                    </div>
                    <PaymentReminderCard 
                        targetDate={nextMonth} 
                        amount="15000" 
                        className="h-full flex-wrap"/>
                </div>
            </section>
            <section>
                <UpcomingEventsSection />
            </section>
        </div>
    )
}

