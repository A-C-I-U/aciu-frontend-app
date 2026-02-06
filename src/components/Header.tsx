import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";
import { useUser } from "@/context/UserContext";

export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user } = useUser();
    const activeRole = user?.role || "member";
    const isAdmin = activeRole === "branch_admin" || activeRole === "national_admin";
    
    const handleOpen = () => {
        setDropdownOpen(true);
    }

    const handleClose = () => {
        setDropdownOpen(false)
    }

    return (
        <header className={`w-full 
            ${isAdmin ? "bg-aciu-green-normal" : "bg-aciu-light-grey"}
            md:bg-white
            p-5  ${activeRole === "member" ? "border-b-[.7px] border-aciu-dashboard-background" : ""}`}>
                <div className="max-w-360 mx-auto">
                     <div className="block md:hidden"> 
                        <MobileNav handleOpen={handleOpen} /> 
                    </div>
                    <div className="hidden md:block">
                        <DesktopNav />
                    </div>
                    <ProfileDropdown 
                        open={dropdownOpen} 
                        onClose={handleClose} 
                    />
                </div>
        </header>
    )
}