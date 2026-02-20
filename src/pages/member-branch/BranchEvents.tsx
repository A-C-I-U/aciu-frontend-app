import { EventItemSkeleton } from "@/components/EventSkeleton";
import { useUpcomingEvents } from "@/services/hooks/events";
import { EventItem } from "../events/components/EventItem";
import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";
import { sectionActions } from "@/components/SectionActions";
import { EmptyPage } from "@/components/EmptyPage";

export default function BranchEvents() {
    const { data, isLoading } = useUpcomingEvents();
    const isMedium = useMediaQuery("(max-width: 1250px)");

    const upcomingEvents = data?.events
        ? data.events.map((event: any) => ({
            ...event,
            img: event.coverImage,
            date: event.eventDate,
            host: event.category?.replace(/_/g, ' ') || "Event"
        })) : []

    const handleSearch = (q: string) => {
        console.log("Searching for:", q);
    }


    return (
        <div className="lg:px-4.5 lg:py-6 flex flex-col gap-6 w-full">
            <SectionHeader
                title={!isMedium ? "Branch Events" : ""}
                onSearch={handleSearch}
                showSearch={isMedium ? false : true}
                actions={sectionActions}
                noTitle={!isMedium ? false : true}
            />
            {!isLoading && upcomingEvents && (upcomingEvents.length === 0) && <EmptyPage label="No upcoming events found." />}
            {isLoading ? (
                <div className="grid lg:grid-cols-2 mlg:grid-cols-3 gap-6">
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