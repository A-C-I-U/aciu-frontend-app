import { PageTitle } from "@/components/PageTitle";
import { AnimatePresence } from "motion/react";
import MotionBox from "@/components/MotionBox";
import { useUser } from "@/context/UserContext";
import { StatsCard } from "@/components/StatsCard";
import { BlogTrafficChart } from "./BlogTrafficChart";
import { DevicesChart } from "./DeviceChart";
import { EventsRegistrationsChart } from "./EventsRegistrationChart";
import { MemberSignUpsChart } from "./MembersSignUpChart";
import { TopBranchesChart } from "./TopBranchesChart";
import { GenderChart } from "./Charts";

export default function Analytics() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-6">
      {user?.role === "national_admin" ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-4 mx-5 mt-6">
            <StatsCard
              title="Total MEMBERS"
              number="1,247"
              rateOfChange="+12.5%"
              description="All Time"
            />
            <StatsCard
              title="Total INFLOWS"
              number="$48,250"
              rateOfChange="+8.3%"
              description="All Time"
            />
            <StatsCard
              title="TOTAL EVENTS HOSTED"
              number="42"
              rateOfChange="+15.2%"
              description="All Time"
            />
            <StatsCard
              title="APPROVED PROJECTS"
              number="10"
              rateOfChange="+5.7%"
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
              <MemberSignUpsChart />
            </div>

            <div className="lg:col-span-1">
              <GenderChart />
            </div>

            <div className="lg:col-span-1">
              <DevicesChart />
            </div>
          </div>

          <div className="my-6  "></div>

          <div>
            <EventsRegistrationsChart />
          </div>

          <div className="my-6 "></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <BlogTrafficChart />
            </div>

            <div>
              <TopBranchesChart />
            </div>
          </div>
        </MotionBox>
      </AnimatePresence>
    </div>
  );
}
