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
    // md:bg-aciu-dashboard-background 

    return (
        <header className="w-full bg-aciu-light-grey
            md:bg-white
            p-5">
                <div className="max-w-[90rem] mx-auto">
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