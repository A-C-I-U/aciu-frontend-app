import { useUser } from "@/context/UserContext";
import { Avatar, IconButton, useMediaQuery } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import DummyProfile from "/images/avatar.png";
import { capitalizeFirstLetters } from "@/utils/helpers";
import { ArrowRight2, CloseCircle, Logout } from "iconsax-react";
import { protectedRoutes } from "@/routes/protectedRoutes";
import { NavLink } from "react-router-dom";
import { createElement, useEffect } from "react";

interface ProfileDropdownProps {
    open: boolean,
    onClose: () => void
}


export default function ProfileDropdown({ open, onClose }: ProfileDropdownProps) {
    const isMobile = useMediaQuery('(max-width:768px)');
    const { user } = useUser();
    const activeRole = user?.role || "member";
    const isAdmin = activeRole === "branch_admin" || activeRole === "national_admin";
    
    const links = protectedRoutes.filter(
        r => r.label && r.roles.includes(activeRole)
    );

    const handleLogout = () => {
        onClose();
    }

   useEffect(() => {
        if (open && isMobile) {
            document.body.classList.add("body-lock");
        } else {
            document.body.classList.remove("body-lock");
        }
        return () => document.body.classList.remove("body-lock");
    }, [open, isMobile]);



    if (isMobile) {
        return (
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "100vh", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`fixed top-0 left-0 w-full 
                            ${isAdmin ? "bg-aciu-green-normal" : "bg-aciu-light-grey"}
                             z-50 h-dvh 
                            flex flex-col items-center gap-8 py-8 px-5 overflow-y-scroll`}
                    >
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-2 items-center">
                                <Avatar src={DummyProfile} className="rounded-[3.125rem] w-8 h-8" />
                                <div className="flex flex-col">
                                    <p className={`font-plus-jakarta-sans font-bold 
                                        ${isAdmin ? "text-white" : "text-aciu-darker-gray"}`}
                                    >
                                        {user && capitalizeFirstLetters(user.name)}
                                    </p>
                                    <p className={`text-[.625rem] 
                                        ${isAdmin ? "text-white" : "text-aciu-darker-gray"} 
                                        font-medium font-plus-jakarta-sans`}>
                                        Personal profile
                                    </p>
                                </div>
                            </div>
                            <IconButton 
                                color="inherit"
                                sx={{
                                    backgroundColor: '#ECF3F2',
                                    color: '#737373',
                                    borderRadius: '100%',
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: '#ECF3F2'
                                    }
                                }}
                                onClick={onClose}
                            >
                                <CloseCircle size={20} color={isAdmin ? "#737373" : "#7A7A7A"}/>
                            </IconButton>
                        </div>
                        <div className="flex flex-col gap-2 items-center w-full">
                            {links.map(({ label, icon, path }, index) => (
                                <NavLink
                                    key={index}
                                    to={path}
                                    className="w-full py-5 px-3 bg-white rounded-lg"
                                    onClick={onClose}>
                                    <span className="flex justify-between items-center ">
                                        <span className="flex gap-2 items-center">
                                            {icon && (
                                                <IconButton
                                                    color="inherit"
                                                    sx={{
                                                        color: "#737373",
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
                                            <span className="text-sm text-aciu-abriba font-coolvetica">
                                                {label}
                                            </span>
                                        </span>
                                        <ArrowRight2 size={16} color={isAdmin ? "#737373" : "#3F3F3F"} />
                                    </span>
                                </NavLink>
                            ))}
                        </div>
                        <button 
                            className="w-full rounded-xl 
                                border border-aciu-red-normal text-aciu-red-normal 
                                p-3 flex items-center gap-3 justify-center" 
                            onClick={handleLogout}
                        >
                            <span className="text-[.625rem] font-semibold font-plus-jakarta-sans">
                                Logout
                            </span>
                            <Logout size={20} color="#FF3B30" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }

    return (
        <></>
    )
}
