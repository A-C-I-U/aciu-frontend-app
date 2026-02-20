import { useUser } from "@/context/UserContext"
import MyBranchPage from "../my-branch";
import MemberBranch from "../member-branch";
import { Navigate } from "react-router-dom";

export default function BranchPage() {
    const { user } = useUser();
    if (user?.role === "branch_admin") return <MyBranchPage />;
    if (user?.role === "member") return <MemberBranch />;
    
    return (
        <Navigate to="/forbidden" />
    )
}