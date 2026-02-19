import { EventItemSkeleton } from "@/components/EventSkeleton";
import { useUpcomingEvents } from "@/services/hooks/events";
import { EventItem } from "../events/components/EventItem";

export default function BranchEvents() {
    const { data, isLoading } = useUpcomingEvents();
    const upcomingEvents = data?.events
        ? data.events.map((event: any) => ({
            ...event,
            img: event.coverImage,
            date: event.eventDate,
            host: event.category?.replace(/_/g, ' ') || "Event"
        })) : []

    return (
        <div className="px-4.5 py-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl leading-[1.2] text-aciu-border-grey">
                    Branch Events
                </h2>
            </div>
            {!isLoading && upcomingEvents && (upcomingEvents.length === 0)}
            {isLoading ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <EventItemSkeleton key={i} />
                    ))}
                </div>
            ): (
                <div className="grid lg:grid-cols-2 mlg:grid-cols-3 gap-6">
                    {upcomingEvents.map(event => (
                        <EventItem
                            key={event.id}
                            event={event}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}