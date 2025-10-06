import { ArrowDown2, Calendar, Clock, Location, Sort } from "iconsax-react";
import { NavLink } from "react-router-dom";

export const EventsCard = () => {
    return (
        <div className="bg-white rounded-[.625rem] p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-0 justify-between md:items-center">
                <h1 className="font-coolvetica text-lg font-bold text-aciu-border-grey">
                    Upcoming Events
                </h1>
                <div className="flex flex-col lg:flex-row gap-4 md:items-center ">
                    <div className="flex gap-2 items-center">
                        <button 
                            className="flex gap-2.5 items-center p-2.5 
                            text-sm text-grayscale-100 rounded-md 
                            font-montserrat font-medium 
                            border border-aciu-card-grey"
                        >
                            Filter
                            <Sort variant="Outline" color="#A4ACB9" size={20} />
                        </button>
                        <button 
                            className="flex gap-2.5 items-center p-2.5
                            text-sm text-grayscale-100 rounded-md 
                            font-montserrat font-medium 
                            border border-aciu-card-grey"
                        >
                            Monthly
                            <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
                        </button>
                       <button 
                            className="flex gap-2.5 items-center p-2.5
                            text-sm text-grayscale-100 rounded-md 
                            font-montserrat font-medium 
                            border border-aciu-card-grey"
                        >
                            2022
                            <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
                        </button>
                    </div>
                    <NavLink
                        to="/events"
                        className="bg-aciu-red p-4 rounded-xl max-w-fit"
                            >
                            <span className="font-coolvetica text-white">
                                View more events
                            </span>
                    </NavLink>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {upcomingEvents.map(({ image, label, dateStr, timeRange }) => (
                    <UpcomingEventCard image={image} label={label} dateStr={dateStr} timeRange={timeRange} />
                ))}
            </div>
        </div>
    )
}

interface UpcomingEventCardProps {
    image: string,
    label: string,
    dateStr: string,
    timeRange: string
}

const UpcomingEventCard = (
    { image, label, dateStr, timeRange, }: UpcomingEventCardProps
) => {

    return (
        <div 
            className="rounded-[.625rem] border border-aciu-light-grey 
            p-1.5 flex flex-col gap-4 
            lg:flex-row lg:items-center 
            lg:justify-between w-full"
        >
            <div className="grid grid-cols-1 lg:grid-cols-[6.625rem_1fr] items-stretch gap-2 w-full">
                <img src={image} className="rounded-[.313rem] w-full md:h-[9.75rem] lg:h-[6.75rem] min-w-[6.75rem] sm:h-[5.688rem]" />
                <div className="flex flex-col gap-4">
                    <p className="font-montserrat text-aciu-border-grey font-medium text-sm md:text-base">
                        {label}
                    </p>
                    <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
                        <p className="md:text-xs lg:text-sm font-medium font-montserrat flex gap-2 items-center">
                            <Calendar size={20} variant="Linear" color="#3E3E3E" />
                            <span className="text-aciu-border-grey">{dateStr}</span>
                        </p>
                        <p className="text-xs lg:text-sm font-medium font-montserrat flex gap-2 items-center">
                            <Clock size={20} variant="Linear" color="#3E3E3E" />
                            <span className="text-aciu-border-grey">{timeRange}</span>
                        </p>
                    </div>
                    
                    <p className="text-xs lg:text-sm font-medium font-montserrat flex gap-2 items-center">
                        <Location size={20} variant="Linear" color="#3E3E3E" />
                        <span className="text-aciu-border-grey">12B Obafemi Awolowo Way, Ikeja, Lagos</span>
                    </p>
                </div>
            </div>
            
            {/* <CustomCountdown targetDate={new Date(date)} variant="block" /> */}
        </div>
    )
}


const upcomingEvents = [
    {
        label: "Igwa Mang Cultural Festival",
        image: "/images/abriba-event.jpg",
        dateStr: "21 January 2026",
        timeRange: "12:00PM - 5:00PM"
    },
    {
        label: "Igwa Mang Cultural Festival",
        image: "/images/abriba-event.jpg",
        dateStr: "21 January 2026",
        timeRange: "12:00PM - 5:00PM"
    },
    {
        label: "Igwa Mang Cultural Festival",
        image: "/images/abriba-event.jpg",
        dateStr: "21 January 2026",
        timeRange: "12:00PM - 5:00PM"
    },
    {
        label: "Igwa Mang Cultural Festival",
        image: "/images/abriba-event.jpg",
        dateStr: "21 January 2026",
        timeRange: "12:00PM - 5:00PM"
    },
]