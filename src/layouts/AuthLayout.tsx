import { Outlet } from "react-router-dom";
import AciuLogo from "/images/aciu-header-logo-admin.png";
import { FileText, Lock } from "lucide-react";
import { useMediaQuery } from "@mui/material";

export default function AuthLayout() {
    const isMedium = useMediaQuery("(max-width:768px)");

    return (
        <div className="min-h-screen w-full flex flex-col">
            <header className="bg-aciu-light-grey w-full flex items-center justify-center">
                <div className="w-full max-w-[80rem] mx-auto flex justify-between items-center py-6 px-5 md:px-15">
                    <img 
                        src={AciuLogo} 
                        alt="Official logo for Abriba Community Improvement Union" 
                        width={isMedium ? 120 : 148} 
                        height={isMedium ? 40 : 56}
                    />
                    <a href="https://aciu-frontend-web.onrender.com/" 
                        className="go-to-homepage"
                    >Go to back to homepage</a>
                </div>
            </header>
            <main className="flex-1 w-full flex items-center justify-center">
                <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-5 py-6 md:px-15">
                    <Outlet />
                </div>
            </main>
            <footer className="bg-aciu-light-grey w-full">
                <div className="w-full max-w-[80rem] mx-auto flex justify-between items-center py-6 px-5 md:px-15">
                    <p className="text-xs md:text-sm font-coolvetica text-aciu-border-grey">© 2025 ACIU</p>
                    <div className="flex gap-6 items-center">
                        <p className="text-xs md:text-sm font-coolvetica text-aciu-border-grey flex gap-1.5 items-center whitespace-nowrap">
                            <span>
                                <Lock width={16} height={16} />
                            </span>
                            <span>Privacy Policy</span>
                        </p>
                        <p className="text-xs md:text-sm font-coolvetica text-aciu-border-grey flex gap-1.5 items-center whitespace-nowrap">
                            <span>
                                <FileText width={16} height={16} />
                            </span>
                            <span>Terms and Condition</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}