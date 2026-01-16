import { EventItemSkeleton } from "@/components/EventSkeleton";
import { useAllEvents } from "@/services/hooks/events"
import { enqueueSnackbar } from "notistack";
import { EventItem } from "./EventItem";
import { EmptyEvents } from "./EmptyEvents";
import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
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

export default function AllEvents() {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useAllEvents(page);
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const isMobile = useMediaQuery("(max-width: 786px)");
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
        })) : [];
    

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
            <div className={`flex ${isMobile ? "items-start" : "items-center"} md:gap-4`}>
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
            {data?.total && Math.ceil(data?.total / 9) > 1 && (
                <PaginationControls
                    total={data?.total ?? 0}
                    page={page}
                    onPageChange={setPage}
                    itemsPerPage={9}
                    desktop={!isMobile}
                />
            )}
           
        </div>
    )
}