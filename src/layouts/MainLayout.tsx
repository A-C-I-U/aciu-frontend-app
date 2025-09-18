import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserContext";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    const { user } = useUser();
    const activeRole = user?.role || "member";
    const isAdmin = activeRole === "branch-admin" || activeRole === "national-admin";

    return (
        <div className="flex min-h-screen">
            <aside className={`hidden md:block fixed top-0 left-0 h-full w-[14.8rem] 
                ${isAdmin ? "bg-aciu-green-normal" : "bg-white"} border-0 border-r-[.7px] border-r-aciu-dashboard-background`}>
                <Sidebar />
            </aside>
            <div className="w-full flex-1 ml-0 md:ml-[14.8rem] ">
                <Header />
                <main className="bg-aciu-body">
                    <div className="max-w-[90rem] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}