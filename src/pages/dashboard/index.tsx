import DashboardNationalAdmin from "./DashboardNationalAdmin";
import DashboardMember from "./DashboardMember";
import { useUserSettings } from "@/services/hooks/settings";
import { Spinner } from "phosphor-react";

export default function Dashboard() {
  const { isLoading } = useUserSettings();
  const currentUserRole = "national-admin"

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <Spinner className="w-6 h-6 animate-spin"/>
    </div>
  )

  return (
    <>
      {currentUserRole !== "national-admin" ?
        <DashboardNationalAdmin /> :
        <DashboardMember />
      }
    </>
  )
}