import { protectedRoutes } from "@/routes/protectedRoutes";
import AciuLogo from "/images/sidebar-aciu-logo-admin.png";
import MemberAciuLogo from "/images/sidebar-aciu-logo.png"
import { useUser } from "@/context/UserContext";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import { createElement } from "react";

const isMobile = window.innerWidth <= 768;


export default function Sidebar() {
    const { user } = useUser();
    const activeRole = user?.role || "member"
    const isAdmin = activeRole === "branch-admin" || activeRole === "national-admin";


    const links = protectedRoutes.filter(r => r.roles.includes(activeRole));
    

    return (
        <div className="flex flex-col gap-10 h-full p-5 overflow-y-scroll no-scrollbar">
            <img 
                src={isAdmin ? AciuLogo : MemberAciuLogo} 
                alt="Official Abriba Community Improvement Union Logo" 
                width={isMobile ? 80 : 120} 
                height={isMobile ? 30 : 45 }
                loading="eager"
            />
            <div className="flex flex-col gap-3">
                {links.map(({ label, icon, path}) => (
                    <NavLink
                        to={path}
                        className={({ isActive }) =>
                            [
                            "flex items-center gap-2 py-[.813rem] px-[.563rem] rounded-md transition-colors group",
                            "text-sm font-coolvetica font-semibold",
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
                                    className="group-hover:!text-aciu-green-normal"
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