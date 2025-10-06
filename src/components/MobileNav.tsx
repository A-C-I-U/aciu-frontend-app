import type { NavProps } from "@/utils/types"
import { SearchNormal } from "iconsax-react"
import solar from '@solar-icons/react'
import DummyProfile from "/images/avatar.png"
import { Avatar } from "@mui/material"
import AciuLogo from "/images/sidebar-aciu-logo-admin.png";
import MemberAciuLogo from "/images/mobile-member-aciu-logo.png";
import { useUser } from "@/context/UserContext"

const isMobile = window.innerWidth <= 768;

export const MobileNav = ({ handleOpen }: NavProps) => {
    const { user } = useUser();
    const activeRole = user?.role || "member";
    const isAdmin = activeRole === "branch-admin" || activeRole === "national-admin";

    return (
        <div>
            <div className="flex justify-between items-center">
                <img
                    src={!isAdmin ? MemberAciuLogo : AciuLogo} 
                    alt="Official Abriba Communal Improvement Union Logo" 
                    width={isMobile ? 80 : 130} 
                    height={isMobile ? 30 : 50}
                    loading="eager"
                />
                <div className="flex items-center gap-4">
                    <button
                        className={`border rounded-[3.125rem] 
                            ${isAdmin ? "border-white" : "border-aciu-white-normal"}
                            w-[2.5rem] h-[2.5rem] 
                            flex items-center justify-center`}
                        >
                        <SearchNormal
                            fontVariant="linear"
                            color={isAdmin ? "#fff" : "#7A7A7A"}
                            size={24}
                        />
                        </button>
                    <button
                        className={`border rounded-[3.125rem] 
                            ${isAdmin ? "border-white" : "border-aciu-white-normal"}
                            w-[2.5rem] h-[2.5rem] 
                            flex items-center justify-center`}
                        >
                        <solar.Notifications.BellBing
                            fontVariant="linear"
                            color={isAdmin ? "#fff" : "#7A7A7A"}
                            height={24}
                            width={24}
                        />
                        </button>

                    <button onClick={handleOpen}>
                        <Avatar src={DummyProfile} className="rounded-[3.125rem] w-8 h-8" />
                    </button>
                </div>
            </div> 
        </div>
    )
}