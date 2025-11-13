import { CustomCountdown } from "@/components/MonthlyCountdown";
import { ProfileCard } from "@/components/ProfileCard";
import { EventsCard } from "@/components/EventsCard";
import { MetricsCard } from "@/components/MetricsCard";
import { NavLink } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useFinances } from "@/services/hooks/dashboard";
import { useDashboardOverview } from "@/services/hooks/dashboard";
import { formatCurrency } from "@/utils/helpers";

export default function Dashboard() {
  const {
    data: finances,
    isLoading: financesLoading,
    error: financesError,
  } = useFinances();
  const { data: dashboardData } = useDashboardOverview();

  const nextMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1
  );

  if (financesLoading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-center items-center h-32">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress size={24} color="success" />
          </Box>
        </div>
      </div>
    );
  }

  if (financesError) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-center items-center h-32">
          <div className="text-center">
            <p className="font-montserrat text-aciu-red">
              Error loading finances
            </p>
            <p className="font-montserrat text-sm text-aciu-border-grey mt-2">
              {financesError.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-lg font-bold font-coolvetica text-aciu-border-grey">
        Hi,{" "}
        {dashboardData?.profile?.fullName
          ? dashboardData.profile.fullName.split(" ")[0]
          : ""}
        ! Welcome Back
      </h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto items-stretch gap-3 w-full">
        <ProfileCard />
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="flex flex-col lg:flex-row gap-[1.375rem] items-center w-full">
            {finances && (
              <>
                <MetricsCard
                  title="Monthly Contributions"
                  price={formatCurrency(finances.monthlyContributions.amount)}
                  timeStamp="Last Month"
                  trend={finances.monthlyContributions.growth}
                />
                <MetricsCard
                  title="Project Donations"
                  price={formatCurrency(finances.projectDonations.amount)}
                  timeStamp="Last Month"
                  trend={finances.projectDonations.growth}
                />
              </>
            )}
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:gap-0 justify-between items-center bg-white rounded-md px-6 py-[3.125rem] w-full">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-montserrat text-aciu-abriba">
                Your Next Monthly Dues:
                <span className="px-2 font-semibold text-lg text-aciu-border-grey">
                  {finances
                    ? formatCurrency(finances.nextMonthlyDue.amount)
                    : "N0"}
                </span>
              </p>
              <div className="bg-aciu-light-red">
                {finances ? (
                  <CustomCountdown targetDate={nextMonth} variant="inline" />
                ) : (
                  <div className="py-2 px-4 text-sm text-aciu-border-grey">
                    Loading countdown...
                  </div>
                )}
              </div>
            </div>
            <NavLink
              to="/my-payments"
              className="bg-aciu-red p-4 rounded-xl min-w-[9rem] text-center"
            >
              <span className="font-coolvetica text-white">Pay now</span>
            </NavLink>
          </div>
        </div>
      </section>
      <section>
        <EventsCard />
      </section>
    </div>
  );
}
