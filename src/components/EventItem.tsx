import type { EventItemProps } from "@/utils/types"
import { Icon } from "@iconify/react/dist/iconify.js"
import { NavLink } from "react-router-dom"

export const EventItem = ({
    id,
    title,
    img,
    host,
    date,
    time,
}: EventItemProps) => {
    return (
        <div
            className={`flex flex-col gap-4 rounded-lg border border-aciu-dark-grey py-2.5 px-2 lg:px-3.5`}>
            <span className="flex flex-col gap-3.5">
                <img 
                    src={img} 
                    height={145}
                    className="rounded-sm object-cover w-full" 
                    alt="Event image" 
                />
                <span className={[
                    "bg-aciu-yellow rounded-md ",
                    "flex items-center justify-center ",
                    "font-semibold text-xs font-coolvetica text-aciu-border-grey",
                    "py-1.5 px-2.5 max-w-fit h-7"
                ].join("")}>
                    {host}
                </span>
            </span>
            <span className="flex flex-col gap-7">
                <span className="text-lg font-coolvetica font-semibold text-aciu-border-grey">
                    {title}
                </span>
                <span className="flex justify-between items-center">
                    <span className="flex flex-col gap-2.5">
                        <span className="text-xs font-montserrat text-aciu-dark-red">
                            Event Date
                        </span>
                        <span className="font-montserrat font-semibold text-sm md:text-xs lg:text-sm text-aciu-darker-grey whitespace-nowrap">
                            {date}
                        </span>
                    </span>
                    <span className="border-[1.69px] border-aciu-dark-grey h-4"></span>
                    <span className="flex flex-col gap-2.5">
                        <span className="text-xs font-montserrat text-aciu-dark-red">
                            Event Time
                        </span>
                        <span className="font-montserrat font-semibold text-sm md:text-xs lg:text-sm text-aciu-darker-grey whitespace-nowrap">
                            {time}
                        </span>
                    </span>
                </span>
                <NavLink
                    to={`/events/${id}`}
                    className={[
                        "border border-aciu-red rounded-lg max-w-fit flex justify-center items-center gap-2 px-5 py-3"
                    ].join("")}
                    >
                        <span className="font-coolvetica text-sm text-aciu-red font-semibold">Learn more</span>
                        <Icon icon="ic:round-arrow-back" width="20" height="20" color="#00CA71" className="transform rotate-[135deg]"/>
                </NavLink>
            </span>
        </div>
    )
}