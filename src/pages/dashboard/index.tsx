import DashboardNationalAdmin from "./DashboardNationalAdmin";
import DashboardMember from "./DashboardMember";
import { useUser } from "@/context/UserContext";

export default function Dashboard() {
  const { user } = useUser();
  const currentUserRole = user?.role;

  return (
    <>
      {currentUserRole === "national_admin" ?
        <DashboardNationalAdmin /> :
        <DashboardMember />
      }
    </>
  )
}