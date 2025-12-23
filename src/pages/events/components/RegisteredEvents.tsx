import { EventItemSkeleton } from "@/components/EventSkeleton";
import { useMyRegisteredEvents } from "@/services/hooks/events";
import { EventItem } from "./EventItem";
import { enqueueSnackbar } from "notistack";
import { EmptyEvents } from "./EmptyEvents";

export default function RegisteredEvents() {
    const { data, isLoading, error } = useMyRegisteredEvents();

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

    if (myRegisteredEvents.length === 0) return <EmptyEvents label="Upcoming" />;
    
    return (
        <div className="grid lg:grid-cols-2 mlg:grid-cols-3 gap-6">
            {myRegisteredEvents.map(event => (
                <EventItem
                    key={event.id}
                    event={event}
                />
            ))}
        </div>
    );
}