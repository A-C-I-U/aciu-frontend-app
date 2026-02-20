import SectionHeader from "@/components/SectionHeader";
import { ArrowDown2, Sort } from "iconsax-react";
import { Link } from "react-router-dom";
import { UpcomingEventCard } from "./UpcomingEventsCard";
import {  useUpcomingEvents } from "@/services/hooks/events";
import { Skeleton } from "@mui/material";
import { useSnackbar } from "notistack";
import type { Event } from "@/services/types/events";

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

const UpcomingEventCardSkeleton = () => {
    return (
        <div className="rounded-[.625rem] border border-aciu-light-grey p-1.5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between w-full">
            <div className="grid lg:grid-cols-[6.625rem_1fr] items-stretch gap-2 w-full">
                <Skeleton variant="rounded" width="100%" height={108} animation="wave" />
                <div className="flex flex-col gap-4">
                    <Skeleton variant="text" width="80%" height={24} animation="wave" />
                    <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
                        <Skeleton variant="text" width={120} height={20} animation="wave" />
                        <Skeleton variant="text" width={100} height={20} animation="wave" />
                    </div>
                    <Skeleton variant="text" width={200} height={20} animation="wave" />
                </div>
            </div>
        </div>
    );
};

export const UpcomingEventsSection = () => {
    const { data, isLoading, error } = useUpcomingEvents();
    const { enqueueSnackbar } = useSnackbar();

    if (error) {
        enqueueSnackbar(`Error loading events: ${error.message}`, {
            variant: 'error',
        });
    }

    const upcomingEvents = data?.events
        ? data.events.map((event: any) => ({
            ...event,
            img: event.coverImage,
            date: event.eventDate,
            host: event.category?.replace(/_/g, ' ') || "Event"
        }))
        .slice(0, 4) : []; 

    const transformedEvents = upcomingEvents.map((event: Event) => ({
        id: event.id,
        image: event.coverImage,
        label: event.title,
        dateStr: new Date(event.eventDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }),
        timeRange: `${event.startTime} - ${event.endTime}`,
        location: event.location
    }));

    return (
        <div className="bg-white rounded-2xs p-5 flex flex-col gap-4">
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
                    className="py-3 px-2 lg:py-4 lg:px-4 gap-2
                        rounded-xl bg-aciu-green-normal whitespace-nowrap min-w-fit
                        text-white font-coolvetica w-full max-w-fit hover:bg-aciu-green-dark transition-colors"
                >
                    View more events
                </Link>
            </div> 
            <div className="grid lg:grid-cols-2 gap-3">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <UpcomingEventCardSkeleton key={index} />
                    ))
                ) : transformedEvents.length > 0 ? (
                    transformedEvents.map((event: any) => (
                        <UpcomingEventCard
                            key={event.id}
                            event={event}
                        />
                    ))
                ) : (
                    <div className="col-span-2 text-center py-4">
                        <p className="text-aciu-abriba">No upcoming events</p>
                    </div>
                )}
            </div>
        </div>
    )
}