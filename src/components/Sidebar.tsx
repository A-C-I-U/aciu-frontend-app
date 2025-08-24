import { protectedRoutes } from "@/routes/protectedRoutes";
import AciuLogo from "/images/sidebar-aciu-logo.png";
import { useUser } from "@/context/UserContext";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import { createElement } from "react";

export default function Sidebar() {
    const { user } = useUser();
    const activeRole = user?.role || "member"

    const links = protectedRoutes.filter(r => r.roles.includes(activeRole));

    return (
        <div className="flex flex-col gap-10 h-full p-5">
            <img 
                src={AciuLogo} 
                alt="Official Abriba Community Improvement Union Logo" 
                width={116} 
                height={43.72}
            />
            <div className="flex flex-col gap-3">
                {links.map(({ label, icon, path}) => (
                    <NavLink
                        to={path}
                        className={({ isActive }) =>
                            [
                                "flex items-center gap-2 py-[.813rem] px-[.563rem] rounded-md transition-colors",
                                " text-sm font-coolvetica font-semibold",
                                "hover:bg-white hover:text-aciu-red",
                                isActive ? "text-aciu-red bg-white" : "text-white",
                            ]
                            .filter(Boolean)
                            .join(" ")
                        }
                        >
                        {({ isActive }) => (
                            <>
                            {icon && (
                                <IconButton
                                    color="inherit"
                                    sx={{
                                        color: isActive ? '#00ca71' : '#FFF',
                                        width: '1.5rem',
                                        height: '1.5rem',
                                        padding: 0,
                                        '&:hover': {
                                            color: '#00ca71'
                                        }
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