import { useUser } from "@/context/UserContext";
import { Avatar, IconButton, useMediaQuery } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import DummyProfile from "/images/avatar.png";
import { capitalizeFirstLetters } from "@/utils/helpers";
import { ArrowRight2, CloseCircle, Logout } from "iconsax-react";
import { protectedRoutes } from "@/routes/protectedRoutes";
import { NavLink } from "react-router-dom";
import { createElement } from "react";

interface ProfileDropdownProps {
    open: boolean,
    onClose: () => void
}


export default function ProfileDropdown({ open, onClose }: ProfileDropdownProps) {
    const isMobile = useMediaQuery('(max-width:768px)');
    const { user } = useUser();
    const activeRole = user?.role || "member"
    
    const links = protectedRoutes.filter(r => r.roles.includes(activeRole));

    const handleLogout = () => {
        onClose();
    }

    if (isMobile) {
        return (
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "100vh", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute top-0 left-0 w-full bg-aciu-light-grey z-50 h-dvh 
                            flex flex-col items-center gap-8 py-8 px-5 overflow-y-scroll"
                    >
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-2 items-center">
                                <Avatar src={DummyProfile} className="rounded-[3.125rem] w-8 h-8" />
                                <div className="flex flex-col">
                                    <p className="font-plus-jakarta-sans font-bold text-aciu-darker-gray">
                                        {user && capitalizeFirstLetters(user.name)}
                                    </p>
                                    <p className="text-[.625rem] text-aciu-gray-light 
                                        font-medium font-plus-jakarta-sans">
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
                                <CloseCircle size={20} color="#7A7A7A"/>
                            </IconButton>
                        </div>
                        <div className="flex flex-col gap-2 items-center w-full">
                            {links.map(({ label, icon, path }) => (
                                <NavLink
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
                                                    {typeof icon === 'string' ? (
                                                        <img 
                                                            src={icon} 
                                                            alt="" 
                                                            width={24} 
                                                            height={24}
                                                        />
                                                    ) : (
                                                        createElement(icon, { size: 24 })
                                                    )}
                                                </IconButton>
                                            )}
                                            <span className="text-sm text-aciu-abriba font-coolvetica">
                                                {label}
                                            </span>
                                        </span>
                                        <ArrowRight2 size={16} color="#3F3F3F" />
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
