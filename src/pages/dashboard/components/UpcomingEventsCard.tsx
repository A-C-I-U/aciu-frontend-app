import type { UpcomingEventCardProps } from "@/utils/types";
import { Calendar, Clock, Location } from "iconsax-react";

export const UpcomingEventCard = (
    { event }: { event: UpcomingEventCardProps }
) => {
    const { image, label, dateStr, timeRange, location } = event;

    return (
        <div 
            className="rounded-[.625rem] border border-aciu-light-grey 
            p-1.5 flex flex-col gap-4 
            lg:flex-row lg:items-center 
            lg:justify-between w-full"
        >
            <div className="grid lg:grid-cols-[6.625rem_1fr] items-stretch gap-2 w-full">
                <img 
                    src={image || '/images/event-placeholder.jpg'} 
                    className="rounded-[.313rem] w-full md:h-39 lg:h-27 min-w-27 sm:h-22.5 object-cover" 
                    alt=""
                    onError={(e) => {
                        e.currentTarget.src = '/images/event-placeholder.jpg';
                    }}
                />
                <div className="flex flex-col gap-4">
                    <p className="font-montserrat text-aciu-border-grey font-medium text-sm lg:text-base">
                        {label}
                    </p>
                    <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
                        <p className="text-xs lg:text-sm font-medium font-montserrat flex gap-2 items-center">
                            <Calendar size={20} variant="Linear" color="#3E3E3E" />
                            <span className="text-aciu-border-grey text-xs lg:text-sm">{dateStr}</span>
                        </p>
                        <p className="text-xs lg:text-sm font-medium font-montserrat flex gap-2 items-center">
                            <Clock size={20} variant="Linear" color="#3E3E3E" />
                            <span className="text-aciu-border-grey text-xs lg:text-sm">{timeRange}</span>
                        </p>
                    </div>
                    
                    <p className="text-xs lg:text-sm font-medium font-montserrat flex gap-2 items-center">
                        <Location size={20} variant="Linear" color="#3E3E3E" />
                        <span className="text-aciu-border-grey text-xs lg:text-sm">
                            {location || "Location not specified"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}