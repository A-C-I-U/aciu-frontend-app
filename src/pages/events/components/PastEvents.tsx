import { usePastEvents } from "@/services/hooks/events";
import { EventItem } from "./EventItem";
import { Alert } from "@mui/material";
import { EmptyEvents } from "./EmptyEvents";
import { EventItemSkeleton } from "@/components/EventSkeleton";

export default function PastEvents() {
    const { data, isLoading, error } = usePastEvents();
    
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
        <div className="grid grid-cols-1 lg:grid-cols-2 mlg:grid-cols-3 gap-6">
            {pastEvents.map(event => (
                <EventItem
                    key={event.id}
                    event={event}
                />
            ))}
        </div>
    );
}