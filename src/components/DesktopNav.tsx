import { Avatar, Breadcrumbs } from "@mui/material"
import { NavLink, useLocation } from "react-router-dom";
import solar from '@solar-icons/react';
import DummyProfile from "/images/avatar.png";
import { ArrowDown2, ArrowRight } from "iconsax-react";
import { capitalizeFirstLetters } from "@/utils/helpers";

export const DesktopNav = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);

    return (
         <div className="flex items-center justify-between">
                <Breadcrumbs 
                    separator={<ArrowRight size={18} color="#C9C9C9"/>}
                    className="flex gap-2" 
                    aria-label="breadcrumb"
                >
                    <p className={"font-montserrat font-medium text-aciu-red"}>
                        Home
                    </p>
                    {pathnames.slice(0, 1).map((value, index, arr) => {
                        const to = "/" + pathnames.slice(0, index + 1).join("/");
                        const isLast = index === arr.length - 1;

                        return isLast ? (
                            <p key={to} className="font-montserrat font-medium text-aciu-abriba">
                                {capitalizeFirstLetters(value)}
                            </p>
                        ) : (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => 
                                ["font-montserrat font-medium", 
                                isActive ? "text-aciu-red" : "text-aciu-abriba"]
                                .filter(Boolean)
                                .join(" ")
                            }
                        >
                            {capitalizeFirstLetters(value)}
                        </NavLink>
                        );
                    })}
                </Breadcrumbs>

                <div 
                    className="flex items-center gap-4"
                >
                    <button
                        className="border border-aciu-white-normal rounded-[3.125rem] 
                                    w-[2.5rem] h-[2.5rem] 
                                    flex items-center justify-center"
                        >
                        <solar.Notifications.BellBing
                            fontVariant="linear"
                            color="#7A7A7A"
                            height={24}
                            width={24}
                        />
                        </button>

                    <button className="flex items-center gap-2.5">
                        <Avatar src={DummyProfile} className="rounded-[3.125rem] w-8 h-8" />
                        <ArrowDown2 size={18} color="#BFBFBF" />
                    </button>
                </div>
            </div>
    )
}