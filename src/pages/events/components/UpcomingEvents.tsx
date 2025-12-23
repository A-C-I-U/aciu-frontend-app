import { EventItemSkeleton } from "@/components/EventSkeleton";
import { useUpcomingEvents } from "@/services/hooks/events";
import { EventItem } from "./EventItem";
import { enqueueSnackbar } from "notistack";
import { EmptyEvents } from "./EmptyEvents";

export default function UpcomingEvents() {
    const { data, isLoading, error } = useUpcomingEvents();

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

    if (upcomingEvents.length === 0) return <EmptyEvents label="Upcoming" />;
    
    return (
        <div className="grid lg:grid-cols-2 mlg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
                <EventItem
                    key={event.id}
                    event={event}
                />
            ))}
        </div>
    );
}