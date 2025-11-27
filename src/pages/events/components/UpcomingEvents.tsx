import { EventItemSkeleton } from "@/components/EventSkeleton";
import { useEvents } from "@/services/hooks/events";
import { Box } from "@mui/material";
import { EventItem } from "./EventItem";
import {  enqueueSnackbar } from "notistack";

export default function UpcomingEvents() {
    const { data, isLoading, error } = useEvents();

    if (error) {
        enqueueSnackbar(`Error loading events: ${error.message}`, {
            variant: 'error',           
        });
    }

    const upcomingEvents = data?.events.filter(event => {
        const eventDate = new Date(event.eventDate);
        const today = new Date();
        return eventDate >= today;
    }) || [];

    if (isLoading) {
        return (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <EventItemSkeleton key={index} />
                ))}
            </Box>
        );
    }

    if (upcomingEvents.length === 0) {
        return (
            <Box className="text-center py-12">
                <p className="text-aciu-abriba text-lg">No upcoming events found.</p>
            </Box>
        );
    }

    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
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
        </Box>
    );
}