import { useUser } from "@/context/UserContext";
import Forbidden from "@/pages/not-found/Forbidden";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface RequireRoleProps {
  roles: string[];
  children?: React.ReactNode;
}

export const RequireRole = ({ roles, children }: RequireRoleProps) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!roles.includes(user.role)) {
    return <Forbidden />;
  }

  return children ? <>{children}</> : <Outlet />;
};
