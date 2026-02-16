import Header from "@/components/Header";
import ScrollToTopOnRouteChange from "@/components/ScrollToTop";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserContext";
import { Outlet, useMatches } from "react-router-dom";

export default function MainLayout() {
    const { user } = useUser();
    const matches = useMatches();

    const activeRole = user?.role || "member";
    const isAdmin = activeRole === "branch_admin" || activeRole === "national_admin";

    // Check if any matched route has 'isNotFound: true' in its handle
    const isNotFound = matches.some((match) => (match.handle as any)?.isNotFound);

    return (
        <div className="flex min-h-screen">
            {!isNotFound && (
                <aside className={`hidden md:block fixed top-0 left-0 h-full w-59 
                    ${isAdmin ? "bg-aciu-green-normal" : "bg-white"}`}
                >
                    <Sidebar />
                </aside>
            )}
            <ScrollToTopOnRouteChange />
            <div className={`w-full flex-1 ml-0 ${!isNotFound ? "md:ml-59" : ""}`}>
                {!isNotFound && <Header />}
                <main className="bg-aciu-body">
                    <div className="max-w-360 mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}