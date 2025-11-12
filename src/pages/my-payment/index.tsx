import MotionBox from "@/components/MotionBox";
import { PageTitle } from "@/components/PageTitle";
import PaymentReminderCard from "@/components/PaymentReminderCard";
import { StatsCard } from "@/components/StatsCard";
import { myDonationsStats, myPaymentsStats } from "@/utils/data";
import type { TabItem } from "@/utils/types"
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import Donations from "./components/donations";
import DueBreakdown from "./components/dues-breakdown";

const myPaymentsTabs: TabItem[] = [
    {
        key: "dues-breakdown",
        label: "Dues Breakdown",
        content: <DueBreakdown />
    },
    {
        key: "donations",
        label: "Donations",
        content: <Donations />
    },
    {
        key: "auto-payment",
        label: "Auto-payment setup",
        content: ""
    }
]

export default function MyPaymentsPage() {
    const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
    const [activeTab, setActiveTab] = useState(myPaymentsTabs[0]);

    const handleTabChange = (tab: TabItem) => {
        if (tab.key === "auto-payment") return;
        setActiveTab(tab)
    }

    const stats = activeTab.key === "dues-breakdown" ?
        myPaymentsStats : myDonationsStats

    return (
        <div className="flex flex-col gap-6">
            <PageTitle
                title="My Payments"
                tabs={myPaymentsTabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
            <AnimatePresence>
                {activeTab.key !== "auto-payment" && (
                    <MotionBox
                        key={activeTab.key}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`mx-5 grid ${activeTab.key === "dues-breakdown" ? "lg:grid-cols-[1fr_1fr_1.5fr]" : "lg:grid-cols-3"} items-stretch gap-3`}
                    >
                        {stats.map((stat, index) => (
                            <div key={index} >
                                <StatsCard
                                    title={stat.title}
                                    number={`${(+stat.number).toLocaleString()}`}
                                    currency={stat.currency}
                                    itemLabel={stat?.itemLabel}
                                    rateOfChange={stat.rateOfChange}
                                />
                            </div>
                        ))}
                        {activeTab?.key === "dues-breakdown" &&
                            <PaymentReminderCard 
                                targetDate={nextMonth} 
                                amount="150000" 
                                className="lg:h-39"
                            />
                        }
                    </MotionBox>
                )}

                 <MotionBox
                    key={activeTab.key + "-content"}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mx-5 px-4 py-5 bg-white"
                    >
                    {activeTab.content}
                </MotionBox>
            </AnimatePresence>
        </div>
    )
}