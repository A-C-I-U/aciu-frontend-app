import SectionHeader from "@/components/SectionHeader";
import { dashboardUpcomingEvents } from "@/utils/data";
import { ArrowDown2, Sort } from "iconsax-react";
import { Link } from "react-router-dom";
import { UpcomingEventCard } from "./UpcomingEventsCard";

const sectionActions = [
    <button 
        className="flex gap-2.5 items-center p-2.5 
        text-sm text-grayscale-100 rounded-md 
        font-montserrat font-medium 
        border border-aciu-card-grey"
    >
        Filter
        <Sort variant="Outline" color="#A4ACB9" size={20} />
    </button>,
    <button 
        className="flex gap-2.5 items-center p-2.5
        text-sm text-grayscale-100 rounded-md 
        font-montserrat font-medium 
        border border-aciu-card-grey"
    >
        Monthly
        <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
    </button>,
    <button 
        className="flex gap-2.5 items-center p-2.5
        text-sm text-grayscale-100 rounded-md 
        font-montserrat font-medium 
        border border-aciu-card-grey"
    >
        2022
        <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
    </button>
]


export const UpcomingEventsSection = () => {
    return (
        <div className="bg-white rounded-[.625rem] p-5 flex flex-col gap-4">
            <div className="flex flex-wrap gap-4 justify-between items-start lg:flex-nowrap lg:items-center w-full">
                <div className="min-w-fit lg:w-full">
                    <SectionHeader
                        title="Upcoming Events"
                        showSearch={false}
                        onSearch={() => {}}
                        actions={sectionActions}
                    />
                </div>
                <Link
                    to="/events"
                    className="py-3 px-2 lg:py-4 lg:px-4 gap-2 pointer-events-none
                        rounded-xl bg-aciu-green-normal whitespace-nowrap min-w-fit
                        text-white font-coolvetica w-full max-w-fit"
                    >
                        View more events
                </Link>
            </div> 
            <div className="grid lg:grid-cols-2 gap-3">
                {dashboardUpcomingEvents.map((event) => (
                    <UpcomingEventCard
                        key={event?.id}
                        event={event}
                    />
                ))}
            </div>
        </div>
    )
}