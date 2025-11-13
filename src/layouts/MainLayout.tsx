import Header from "@/components/Header";
import ScrollToTopOnRouteChange from "@/components/ScrollToTop";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserContext";
import { AnimatePresence, motion } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
    const { user } = useUser();
    const location = useLocation();

    const activeRole = user?.role || "member";
    const isAdmin = activeRole === "branch-admin" || activeRole === "national-admin";

    return (
        <div className="flex min-h-screen">
            <aside className={`hidden md:block fixed top-0 left-0 h-full w-[14.8rem] 
                ${isAdmin ? "bg-aciu-green-normal" : "bg-white"} 
                border-0 border-r-[.7px] border-r-aciu-dashboard-background`}
            >
                <Sidebar />
            </aside>
            <ScrollToTopOnRouteChange />
            <div className="w-full flex-1 ml-0 md:ml-[14.8rem] ">
                <Header />
                <main className="bg-aciu-body">
                    <div className="max-w-[90rem] mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    )
}