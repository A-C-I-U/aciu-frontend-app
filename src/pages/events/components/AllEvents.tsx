import { EventItemSkeleton } from "@/components/EventSkeleton";
import { useAllEvents } from "@/services/hooks/events"
import { enqueueSnackbar } from "notistack";
import { EventItem } from "./EventItem";
import { EmptyEvents } from "./EmptyEvents";
import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const sectionActions = [
    <button className="section-action-button admin">
        Filter
    </button>,
    <button className="section-action-button admin">
        2022
    </button>
]

export default function AllEvents() {
    const { data, isLoading, error } = useAllEvents();
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const [_query, setQuery] = useState("");

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    const allEvents = data?.events
        ? data.events.map((event: any) => ({
            ...event,
            img: event.coverImage,
            date: event.eventDate,
            host: event.category?.replace(/_/g, ' ') || "Event"
        })) : []

    if (error) {
        enqueueSnackbar(`Error loading events: ${error.message}`, {
            variant: 'error',           
        });
    }

    if (isLoading) {
        return (
            <div className="grid lg:grid-cols-2 mlg:grid-cols-3 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <EventItemSkeleton key={index} />
                ))}
            </div>
        );
    }


    if (allEvents?.length === 0) return <EmptyEvents />

    return (
        <div className="flex flex-col gap-5.75">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                    <SectionHeader
                        title="All Events"
                        onSearch={handleSearch}
                        showSearch={isMedium ? false : true}
                        actions={sectionActions}
                    />
                    <Link
                        className="btn btn-primary max-w-fit !text-sm md:text-base! leading-[155%]"
                        to="/events/create"
                    >
                        Create Event
                    </Link>
                </div>
            <div className="grid lg:grid-cols-2 mlg:grid-cols-3 gap-6">
                {allEvents?.map(event => (
                    <EventItem
                        key={event.id}
                        event={event}
                    />
                ))}
            </div>
        </div>
    )
}