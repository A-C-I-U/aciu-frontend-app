import { protectedRoutes } from "@/routes/protectedRoutes"
import { useUser } from "@/context/UserContext";
import { NavLink } from "react-router-dom";
import { IconButton, useMediaQuery } from "@mui/material";
import { createElement } from "react";
import AciuLogo from "/images/sidebar-aciu-logo-admin.png";
import MemberAciuLogo from "/images/sidebar-aciu-logo.png"

export default function Sidebar() {
    const { user } = useUser();
    const isMobile = useMediaQuery('max-width:768px')

    const activeRole = user!.role;
    const isAdmin = activeRole === "branch_admin" || activeRole === "national_admin";


    const links = protectedRoutes.filter(r => r.roles.includes(activeRole));
    

    return (
        <div className={`flex flex-col pt-5 px-5 overflow-hidden h-screen ${activeRole === "member" ? "border-r-[.7px] border-aciu-dashboard-background" : ""}`}>
            <div className="pb-3">
                <img 
                    src={isAdmin ? AciuLogo : MemberAciuLogo } 
                    alt="Official Abriba Community Improvement Union Logo" 
                    width={isMobile ? 80 : 120} 
                    height={isMobile ? 30 : 45 }
                    loading="eager"
                />
            </div>
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto py-5 no-scrollbar">
                {links.map(({ label, icon, path}, index) => (
                    <NavLink
                        key={index}
                        to={path}
                        className={({ isActive }) =>
                            [
                            "flex items-center gap-2 py-3.5 px-2 rounded-md transition-colors duration-300 ease-in-out group",
                            "text-sm font-coolvetica leading-default transition-transform active:scale-95",
                            "outline-none focus:outline-none focus-visible:outline-none",
                            isAdmin
                                ? "hover:bg-white hover:text-aciu-green-normal"
                                : "hover:bg-aciu-green-light hover:text-aciu-green-normal",
                            isActive
                                ? isAdmin
                                ? "text-aciu-green-normal bg-white"
                                : "text-aciu-green-normal bg-aciu-green-light"
                                : isAdmin
                                ? "text-white"
                                : "text-aciu-abriba",
                            ]
                            .filter(Boolean)
                            .join(" ")
                        }
                        >
                        {({ isActive }) => (
                            <>
                            {icon && (
                                <IconButton
                                    className="group-hover:text-aciu-green-normal!"
                                    sx={{
                                        color: isActive 
                                            ? (isAdmin ? "#00B686" : "#00B686") 
                                            : (isAdmin ? "#fff" : "#737373"),
                                        width: '1.5rem',
                                        height: '1.5rem',
                                        padding: 0,
                                        "&:hover": {
                                            color: "#00B686",
                                        },
                                    }}
                                >
                                    {createElement(icon, { size: 24 })}
                                </IconButton>
                            )}
                            <span >
                                {label}
                            </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}