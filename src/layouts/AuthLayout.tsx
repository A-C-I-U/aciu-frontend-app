import { Outlet } from "react-router-dom";
import AciuLogo from "/images/aciu-logo.png";
import { FileText, Lock } from "lucide-react";

export default function AuthLayout() {
    return (
        <div className="min-h-screen w-full flex flex-col">
            <header className="bg-aciu-light-grey w-full flex items-center justify-center">
                <div className="w-full max-w-[80rem] mx-auto flex justify-between items-center py-6 px-[3.75rem]">
                    <img 
                        src={AciuLogo} 
                        alt="Official logo for Abriba Community Improvement Union" 
                        width={148} 
                        height={56}
                    />
                    <a href="https://aciu-frontend-web.onrender.com/" 
                        className="go-to-homepage"
                    >Go to Homepage</a>
                </div>
            </header>
            <main className="flex-1 w-full flex items-center justify-center">
                <div className="max-w-[80rem] mx-auto flex justify-between items-center py-6 px-[3.75rem]">
                    <Outlet />
                </div>
            </main>
            <footer className="bg-aciu-light-grey w-full">
                <div className="w-full max-w-[80rem] mx-auto flex justify-between items-center py-6 px-[3.75rem]">
                    <p className="text-sm font-coolvetica text-aciu-border-grey">© 2025 ACIU</p>
                    <div className="flex gap-6 items-center">
                        <p className="text-sm font-coolvetica text-aciu-border-grey flex gap-[6px] items-center">
                            <span>
                                <Lock width={16} height={16} />
                            </span>
                            <span>Privacy Policy</span>
                        </p>
                        <p className="text-sm font-coolvetica text-aciu-border-grey flex gap-[6px] items-center">
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