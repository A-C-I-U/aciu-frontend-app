import { useUser } from "@/context/UserContext";
import DummyProfile from "/images/profile-img.png"
import { Call, SmsNotification, TickCircle } from "iconsax-react";
import { NavLink } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';


const quickActions = [
    { label: "Pay my dues", path: "/my-payments" },
    { label: "View projects", path: "/projects" },
    { label: "View events", path: "/events" },
    { label: "Edit profile info", path: "/settings" }
]

export const ProfileCard = () => {
    const { user } = useUser();

    return (
        <div className="bg-white rounded-[.625rem] py-6 px-5 flex flex-col gap-2 w-full">
            <div className="grid md:grid-cols-[8.625rem_1fr] items-center gap-3">
                <div 
                    className="hidden md:block relative w-34.5 rounded-[.625rem]" 
                    aria-label="Image editor"
                >
                    <img 
                        src={DummyProfile} 
                        alt="User profile image"
                        width="100%" 
                        height="100%" 
                        className="rounded-[.625rem] object-cover h-full"
                    />
                    <button className="w-full bg-aciu-light-red absolute bottom-0 text-xs font-coolvetica text-aciu-red h-7">
                        Change Photo
                    </button>
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-aciu-border-grey font-semibold">
                            {user?.name}
                        </p>
                        <p className="text-xs text-aciu-abriba font-medium">
                            {user?.occupation}
                        </p>
                    </div>
                    <div className="w-full flex flex-col gap-4 md:items-center md:flex-row md:flex-wrap">
                        <span className="flex gap-2 items-center">
                            <Call size={16} color="#00CA71" />
                            <span className="font-montserrat text-aciu-border-grey text-sm">
                                {user?.phoneNumber}
                            </span>
                        </span>
                        <span className="flex gap-2 items-center">
                            <SmsNotification size={16} color="#00CA71" />
                            <span className="font-montserrat text-aciu-border-grey text-sm">
                                {user?.email}
                            </span>
                        </span>
                    </div>
                    <div className="flex gap-4 items-center flex-wrap">
                        {user?.ageGrade &&
                            <div className="rounded-[3.125rem] py-2 px-3 flex gap-2 items-center bg-aciu-green-light max-w-fit">
                                <TickCircle size={22} color="#00B686" variant="Bold"/>
                                <p className="font-montserrat text-xs font-semibold text-aciu-border-grey">
                                    Age Grade
                                </p>
                            </div>
                        }
                       {user?.branch &&
                            <div className="rounded-[3.125rem] py-2 px-3 flex gap-2 items-center bg-aciu-green-light max-w-fit">
                                <TickCircle size={22} color="#00B686" variant="Bold"/>
                                <p className="whitespace-nowrap font-montserrat text-xs font-semibold text-aciu-border-grey">
                                    Branch Verified
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <hr color="#C9C9C9" className="w-full text-aciu-dark-grey" />
            <div className="flex flex-col gap-4 mt-8">
                <p className="text-aciu-blue-dark font-coolvetica">
                    Quick Actions
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    {quickActions.map(({ label, path }, index) => (
                        <NavLink
                            key={index}
                            to={path}
                             className={[
                                    "flex justify-between items-center rounded-sm py-2.5 px-3.5 border transition-colors",
                                    index % 2 === 0
                                    ? "bg-accent-100 border-accent-300"
                                    : "bg-primary-100 border-primary-300"
                                ].join(" ")}>
                                <>
                                    <span className="font-semibold font-montserrat text-sm text-aciu-border-grey">
                                        {label}
                                    </span>
                                    <ArrowForwardIosRoundedIcon 
                                        sx={{
                                            width: "1rem",
                                            height: "1rem",
                                            color: "#14213D"
                                        }}
                                    />
                                </>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

