import { EventItemSkeleton } from "@/components/EventSkeleton";
import { useMyRegisteredEvents } from "@/services/hooks/events";
import { EventItem } from "./EventItem";
import { enqueueSnackbar } from "notistack";
import { EmptyEvents } from "./EmptyEvents";
import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { ArrowDown2, Sort } from "iconsax-react";

const sectionActions = [
    <button className="section-action-button admin">
        Filter
        <Sort size={20} color="#A4ACB9" />
    </button>,
    <button className="section-action-button admin">
        2022
        <ArrowDown2 size={20} color="#A4ACB9" />
    </button>
]


export default function RegisteredEvents() {
    const { data, isLoading, error } = useMyRegisteredEvents();
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [_query, setQuery] = useState("");

     const handleSearch = (q: string) => {
        setQuery(q);
    }

    if (error) {
        enqueueSnackbar(`Error loading events: ${error.message}`, {
            variant: 'error',           
        });
    }

    const myRegisteredEvents = data?.events
        ? data.events.map((event: any) => ({
            ...event,
            img: event.coverImage,
            date: event.eventDate,
            host: event.category?.replace(/_/g, ' ') || "Event"
        })) : []

    if (isLoading) {
        return (
            <div className="grid lg:grid-cols-2 mlg:grid-cols-3 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <EventItemSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (myRegisteredEvents.length === 0) return <EmptyEvents label="Registered" />;
    
    return (
         <div className="flex flex-col gap-5.75">
            <div className={`flex ${isMobile ? "items-start" : "items-center"} md:gap-4`}>
                <SectionHeader
                    title="Registered Events"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                />
            </div>
            <div className="grid lg:grid-cols-2 mlg:grid-cols-3 gap-6">
                {myRegisteredEvents.map(event => (
                    <EventItem
                        key={event.id}
                        event={event}
                    />
                ))}
            </div>
        </div>
    );
}