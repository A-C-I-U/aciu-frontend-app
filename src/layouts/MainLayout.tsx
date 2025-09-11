import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen">
            <aside className="hidden md:block fixed top-0 left-0 h-full w-[14.8rem] bg-white border-0 border-r-[.7px] border-r-aciu-dashboard-background">
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