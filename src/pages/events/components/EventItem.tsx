import type { EventItemProps } from "@/utils/types"
import { Icon } from "@iconify/react/dist/iconify.js"
import { format, formatDate, parse } from "date-fns"
import { NavLink } from "react-router-dom"

export const EventItem = ({
    event
}: { event: EventItemProps }) => {
    const {
        id,
        title,
        img,
        host,
        date,
        startTime,
        endTime,
        description,
        location
    } = event;

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-aciu-dark-grey py-2.5 px-2 lg:px-3.5 h-full">
            <span className="flex flex-col gap-3.5">
                <img
                    src={img || "/images/event-placeholder.jpg"}
                    className="rounded-sm object-cover w-full max-h-36.25"
                    alt="Event image"
                    onError={(e) => {
                        e.currentTarget.src = "/images/event-placeholder.jpg";
                    }}
                />
                <span className="event-tag py-1.75 px-2.5">{host.toLowerCase()}</span>
            </span>

            <div className="flex flex-col gap-6.5 flex-grow">
                <div className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1">
                        <span className="text-lg font-coolvetica font-semibold text-aciu-border-grey line-clamp-2 capitalize">
                            {title}
                        </span>
                        {description && (
                            <p className="text-xs text-aciu-abriba line-clamp-3">{description}</p>
                        )}
                    </div>
                </div>

                {location && (
                    <span className="flex items-center gap-1.5 text-sm text-aciu-darker-grey leading-default font-semibold">
                        <Icon icon="mdi:location" width="16" height="16" />
                        {location}
                    </span>
                )}

                <span className="flex justify-between items-center">
                    <span className="flex flex-col gap-2.5">
                        <span className="text-xs font-montserrat text-aciu-dark-red leading-default">
                            Event Date
                        </span>
                        <span className="font-montserrat font-semibold text-xs text-aciu-darker-grey whitespace-nowrap leading-default">
                            {formatDate(date, "do MMMM yyyy")}
                        </span>
                    </span>
                    {(startTime || endTime) && (
                    <>
                        <span className="border-[1.69px] border-aciu-dark-grey h-4"></span>
                        <span className="flex flex-col gap-2.5">
                            <span className="text-xs font-montserrat text-aciu-dark-red leading-default">
                                Event Time
                            </span>
                            <span className="font-montserrat font-semibold text-xs text-aciu-darker-grey whitespace-nowrap leading-default">
                                {format(parse(startTime, "HH:mm", new Date()), "h:mm a")} -{" "}
                                {format(parse(endTime, "HH:mm", new Date()), "h:mm a")}
                            </span>
                        </span>
                    </>
                )}
            </span>
        </div>
            <NavLink
                to={`/events/${id}`}
                className="border border-aciu-red hover:bg-aciu-green-light-hover transition-colors rounded-lg max-w-fit flex items-center gap-2 px-5 py-3 mt-auto"
            >
                <span className="font-coolvetica text-sm text-aciu-red font-semibold">
                    Learn more
                </span>
                <Icon
                    icon="ic:round-arrow-back"
                    width="20"
                    height="20"
                    color="#00CA71"
                    className="transform rotate-[135deg]"
                />
            </NavLink>
        </div>
    )}