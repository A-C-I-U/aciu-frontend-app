import { CustomCountdown } from "@/components/MonthlyCountdown";
import { ProfileCard } from "@/components/ProfileCard";
import { MetricsCard } from "@/components/MetricsCard";
import { NavLink } from "react-router-dom";
import {  Skeleton } from "@mui/material";
import { useFinances } from "@/services/hooks/dashboard";
import { useDashboardOverview } from "@/services/hooks/dashboard";
import { formatCurrency } from "@/utils/helpers";
import { UpcomingEventsSection } from "./components/UpcomingEventsSection";

export default function DashboardMember() {
  const {
    data: finances,
    isLoading: financesLoading,
    error: financesError,
  } = useFinances();
  
  const { 
    data: dashboardData, 
    isLoading: dashboardLoading 
  } = useDashboardOverview();

  const nextMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1
  );

  if (financesLoading || dashboardLoading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <Skeleton 
          variant="text" 
          width={300} 
          height={40} 
          sx={{ fontSize: '1.5rem' }}
        />
        
        <section className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto items-stretch gap-3 w-full">
          <div className="bg-white rounded-lg p-6">
            <Skeleton variant="circular" width={80} height={80} />
            <Skeleton variant="text" width={200} height={30} sx={{ mt: 2 }} />
            <Skeleton variant="text" width={150} height={20} />
            <Skeleton variant="text" width={180} height={20} />
            <Skeleton 
              variant="rectangular" 
              width={120} 
              height={40} 
              sx={{ mt: 2, borderRadius: '8px' }}
            />
          </div>
          
          <div className="flex flex-col gap-4 items-center w-full">
            <div className="flex flex-col lg:flex-row gap-[1.375rem] items-center w-full">
              <div className="bg-white rounded-lg p-6 w-full">
                <Skeleton variant="text" width={150} height={25} />
                <Skeleton variant="text" width={120} height={35} sx={{ mt: 1 }} />
                <Skeleton variant="text" width={100} height={20} sx={{ mt: 1 }} />
              </div>
              <div className="bg-white rounded-lg p-6 w-full">
                <Skeleton variant="text" width={150} height={25} />
                <Skeleton variant="text" width={120} height={35} sx={{ mt: 1 }} />
                <Skeleton variant="text" width={100} height={20} sx={{ mt: 1 }} />
              </div>
            </div>
            
            <div className="flex flex-col gap-6 md:flex-row md:gap-0 justify-between items-center bg-white rounded-md px-6 py-[3.125rem] w-full">
              <div className="flex flex-col gap-4">
                <Skeleton variant="text" width={250} height={25} />
                <div className="bg-aciu-light-red p-4 rounded">
                  <Skeleton variant="text" width={200} height={20} />
                </div>
              </div>
              <Skeleton 
                variant="rectangular" 
                width={120} 
                height={44} 
                sx={{ borderRadius: '12px' }}
              />
            </div>
          </div>
        </section>
        
        <section>
          <Skeleton variant="text" width={200} height={30} sx={{ mb: 3 }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: '8px' }} />
                <Skeleton variant="text" width="80%" height={25} sx={{ mt: 2 }} />
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="90%" height={60} sx={{ mt: 1 }} />
              </div>
            ))}
          </div>
        </section>
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
                  metric={{
                    title: "Monthly Contributions",
                    price: formatCurrency(finances.monthlyContributions.amount),
                    timeStamp: "Last Month",
                    trend: finances.monthlyContributions.growth
                  }}
                />
                <MetricsCard
                  metric={{
                    title: "Project Donations",
                    price: formatCurrency(finances.projectDonations.amount),
                    timeStamp: "Last Month", 
                    trend: finances.projectDonations.growth
                  }}
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
        <UpcomingEventsSection />
      </section>
    </div>
  );
}