import MotionBox from "@/components/MotionBox";
import { PageTitle } from "@/components/PageTitle";
import PaymentReminderCard from "@/components/PaymentReminderCard";
import { StatsCard } from "@/components/StatsCard";
import { useDuesDashboard } from "@/services/hooks/mypaments";
import { useDonationsDashboard } from "@/services/hooks/mypaments";
import type { TabItem } from "@/utils/types";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import Donations from "./components/donations";
import DueBreakdown from "./components/dues-breakdown";

const myPaymentsTabs: TabItem[] = [
  {
    key: "dues-breakdown",
    label: "Dues Breakdown",
    content: <DueBreakdown />,
  },
  {
    key: "donations",
    label: "Donations",
    content: <Donations />,
  },
  {
    key: "auto-payment",
    label: "Auto-payment setup",
    content: "",
  },
];

export default function MyPaymentsPage() {
  const nextMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1
  );
  const [activeTab, setActiveTab] = useState(myPaymentsTabs[0]);

  const {
    data: duesData,
    isLoading: duesLoading,
    error: duesError,
  } = useDuesDashboard();

  const {
    data: donationsData,
    isLoading: donationsLoading,
    error: donationsError,
  } = useDonationsDashboard();

  const handleTabChange = (tab: TabItem) => {
    if (tab.key === "auto-payment") return;
    setActiveTab(tab);
  };

  const duesBreakdownStats = duesData
    ? [
        {
          title: "Total Contributions",
          number: `${duesData.totalContributions.amount.toLocaleString()}`,
          rateOfChange: duesData.totalContributions.growth || "0",
          currency: "N",
        },
        {
          title: "Outstanding Balance",
          number: `${duesData.outstandingBalance.amount.toLocaleString()}`,
          rateOfChange: duesData.totalContributions.growth || "0",
          currency: "N",
        },
      ]
    : [];

  const donationsBreakdownStats = donationsData
    ? [
        {
          title: "My Total Donations",
          number: `${donationsData.totalDonations.amount.toLocaleString()}`,
          rateOfChange: donationsData.totalDonations.growth || "0",
          currency: "N",
        },
        {
          title: "Projects Supported",
          number: `${donationsData.projectsSupported.count.toLocaleString()}`,
          itemLabel: "Projects",
          rateOfChange: donationsData.projectsSupported.growth || "0",
        },
        {
          title: "Events Supported",
          number: `${donationsData.eventsSupported.count.toLocaleString()}`,
          itemLabel: "Events",
          rateOfChange: donationsData.eventsSupported.growth || "0",
        },
      ]
    : [];

  const stats =
    activeTab.key === "dues-breakdown"
      ? duesBreakdownStats
      : donationsBreakdownStats;

  const isLoading =
    activeTab.key === "dues-breakdown" ? duesLoading : donationsLoading;
  const error = activeTab.key === "dues-breakdown" ? duesError : donationsError;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <PageTitle
          title="My Payments"
          tabs={myPaymentsTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <div
          className={`mx-5 grid ${
            activeTab.key === "dues-breakdown"
              ? "lg:grid-cols-[1fr_1fr_1.5fr]"
              : "lg:grid-cols-3"
          } items-stretch gap-3`}
        >
          {[1, 2, 3].map((item) => (
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
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <PageTitle
          title="My Payments"
          tabs={myPaymentsTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <div className="mx-5 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">
            Error loading{" "}
            {activeTab.key === "dues-breakdown" ? "payment" : "donation"} data:{" "}
            {error.message}
          </p>
        </div>
      </div>
    );
  }

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
            className={`mx-5 grid ${
              activeTab.key === "dues-breakdown"
                ? "lg:grid-cols-[1fr_1fr_1.5fr]"
                : "lg:grid-cols-3"
            } items-stretch gap-3`}
          >
            {stats.map((stat, index) => (
              <div key={index}>
                <StatsCard
                  title={stat.title}
                  number={stat.number}
                  currency={stat.currency}
                  //   itemLabel={stat.itemLabel}
                  itemLabel={(stat as any).itemLabel}
                  rateOfChange={stat.rateOfChange}
                />
              </div>
            ))}
            {activeTab?.key === "dues-breakdown" && duesData && (
              <PaymentReminderCard
                targetDate={nextMonth}
                amount={duesData.nextMonthlyDue.amount.toString()}
                className="lg:h-39"
                timeUntilDue={duesData.nextMonthlyDue.timeUntilDue}
              />
            )}
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
  );
}
