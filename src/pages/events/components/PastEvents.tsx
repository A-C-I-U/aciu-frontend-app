import { usePastEvents } from "@/services/hooks/events";
import { EventItem } from "./EventItem";
import { Alert } from "@mui/material";
import { EmptyEvents } from "./EmptyEvents";
import { EventItemSkeleton } from "@/components/EventSkeleton";
import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { PaginationControls } from "@/pages/blog/components/shared/PaginationControls";
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

export default function PastEvents() {
    const { data, isLoading, error } = usePastEvents();
    const isMedium = useMediaQuery("(max-width: 1250px)");
     const isMobile = useMediaQuery("(max-width: 786px)");
    const [_query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    
    const handleSearch = (q: string) => {
        setQuery(q);
    }
    
    const pastEvents = data?.events
        ? data.events.map((event: any) => ({
            ...event,
            img: event.coverImage,
            date: event.eventDate,
            host: event.category?.replace(/_/g, ' ') || "Event"
        })) : []

     if (isLoading) {
        return (
            <div className="grid lg:grid-cols-2 ml:grid-cols-3 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <EventItemSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Alert severity="error" className="w-full">
                Error loading events: {error.message}
            </Alert>
        );
    }

    if (pastEvents.length === 0) return <EmptyEvents label="Past"/>;

    return (
         <div className="flex flex-col gap-5.75">
            <div className={`flex ${isMobile ? "items-start" : "items-center"} md:gap-4`}>
                <SectionHeader
                    title="All Events"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 mlg:grid-cols-3 gap-6">
                {pastEvents.map(event => (
                    <EventItem
                        key={event.id}
                        event={event}
                    />
                ))}
            </div>
            
            {Math.ceil(pastEvents.length) > 1 &&
                <PaginationControls
                    total={pastEvents.length ?? 0}
                    page={page}
                    onPageChange={setPage}
                    itemsPerPage={9}
                    desktop={!isMobile}
                />
            }
        </div>
    );
}