import { useEvents } from "@/services/hooks/events";
import { EventItem } from "./EventItem";
import { CircularProgress, Alert } from "@mui/material";

export default function PastEvents() {
    const { data, isLoading, error } = useEvents();

    const pastEvents = data?.events.filter(event => {
        const eventDate = new Date(event.eventDate);
        const today = new Date();
        return eventDate < today;
    }) || [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <CircularProgress />
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

    if (pastEvents.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-aciu-abriba text-lg">No past events found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map(event => (
                <EventItem
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    img={event.coverImage}
                    host={event.category?.replace(/_/g, ' ') || "Event"}
                    date={event.eventDate}
                    time={event.startTime}
                    description={event.description}
                    location={event.location}
                    category={event.category}
                    entryFee={event.entryFee}
                    enableRSVP={event.enableRSVP}
                    enableDonations={event.enableDonations}
                    registeredCount={event.registeredCount}
                />
            ))}
        </div>
    );
}