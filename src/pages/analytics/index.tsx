import { PageTitle } from "@/components/PageTitle";
import { AnimatePresence } from "motion/react";
import MotionBox from "@/components/MotionBox";
import { useUser } from "@/context/UserContext";
import { StatsCard } from "@/components/StatsCard";
import { BlogTrafficChart } from "./BlogTrafficChart";
import { DevicesChart } from "./DeviceChart";
import { EventsRegistrationsChart } from "./EventsRegistrationChart";
import { TopBranchesChart } from "./TopBranchesChart";
import { MemberSignUpsChart } from "./MembersSignUpChart";
import { GenderChart } from "./GenderChart"
import { useNationalAnalytics } from "@/services/hooks/analytics";
import { AnalyticsSkeleton } from "./AnalyticsSkeleton";

export default function Analytics() {
  const { user } = useUser();
  const { data: analyticsData, isLoading, error } = useNationalAnalytics();

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-red-500">
        Error loading analytics data. Please try again later.
      </div>
    );
  }

  const data = analyticsData?.data;

  return (
    <div className="flex flex-col gap-6">
      {user?.role === "national_admin" ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-4 mx-5 mt-6">
            <StatsCard
              title="Total MEMBERS"
              number={data?.overview?.totalMembers.toString() || "0"}
              rateOfChange={`${data?.memberSignups?.percentageChange || 0}%`}
              description="All Time"
            />
            <StatsCard
              title="Total INFLOWS"
              number={`₦${data?.overview?.totalInflows.toLocaleString() || "0"}`}
              rateOfChange="+0%"
              description="All Time"
            />
            <StatsCard
              title="TOTAL EVENTS HOSTED"
              number={data?.overview?.totalEvents.toString() || "0"}
              rateOfChange="+0%"
              description="All Time"
            />
            <StatsCard
              title="APPROVED PROJECTS"
              number={data?.overview?.totalApprovedProjects.toString() || "0"}
              rateOfChange="+0%"
              description="All Time"
            />
          </div>
        </div>
      ) : (
        <PageTitle title="Analytics" />
      )}
      <AnimatePresence>
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-transparent"
          mx="1.25rem"
          px={{
            xs: "0",
            md: "0",
          }}
          py="0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2">
              <MemberSignUpsChart
                data={data?.memberSignups?.dailyTrend || []}
                percentageChange={data?.memberSignups?.percentageChange}
              />
            </div>

            <div className="lg:col-span-1">
              <GenderChart data={data?.genderDistribution} />
            </div>

            <div className="lg:col-span-1">
              <DevicesChart data={data?.deviceUsage} />
            </div>
          </div>

          <div className="my-6  "></div>

          <div>
            <EventsRegistrationsChart data={data?.eventRegistrations?.monthlyTrend || []} availableYears={data?.eventRegistrations?.availableYears || []} />
          </div>

          <div className="my-6 "></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <BlogTrafficChart data={data?.blogTraffic} />
            </div>

            <div>
              <TopBranchesChart data={data?.topBranches || []} />
            </div>
          </div>
        </MotionBox>
      </AnimatePresence>
    </div>
  );
}
