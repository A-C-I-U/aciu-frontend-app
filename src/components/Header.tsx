import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";

export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleOpen = () => {
        setDropdownOpen(true);
    }

    const handleClose = () => {
        setDropdownOpen(false)
    }

    return (
        <header className="w-full bg-aciu-red 
            md:bg-aciu-dashboard-background 
            hover:border-b-[.7px] 
            hover:border-aciu-dashboard-background p-5">
            <div className="block md:hidden"> 
                <MobileNav handleOpen={handleOpen} /> 
            </div>
            <div className="hidden md:block">
                <DesktopNav />
            </div>
            <ProfileDropdown open={dropdownOpen} onClose={handleClose} />
        </header>
    )
}