import { EventItemSkeleton } from "@/components/EventSkeleton";
import { useAllEvents } from "@/services/hooks/events"
import { enqueueSnackbar } from "notistack";
import { EventItem } from "./EventItem";
import { EmptyEvents } from "./EmptyEvents";

export default function AllEvents() {
    const { data, isLoading, error } = useAllEvents();

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
            <div className="grid grid-cols-1 lg:grid-cols-2 mlg:grid-cols-3 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <EventItemSkeleton key={index} />
                ))}
            </div>
        );
    }


    if (allEvents?.length === 0) return <EmptyEvents />

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 mlg:grid-cols-3 gap-6">
            {allEvents?.map(event => (
                <EventItem
                    key={event.id}
                    event={event}
                />
            ))}
        </div>
    )
}