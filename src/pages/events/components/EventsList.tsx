import { EventItem } from "@/pages/events/components/EventItem";
import { useState } from "react";
import SearchBar from "@/components/SearchBar"
import { ArrowDown2, Sort } from "iconsax-react"
import type { BranchEvent } from "@/services/types/helpandsupport";

interface EventsListProps {
  events?: BranchEvent[];
}

export default function EventsList({ events = [] }: EventsListProps) {
    const [query, setQuery] = useState("");
        
    const handleSearch = (q: string) => {
        setQuery(q);
        console.log(query);
    }

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase())
    );

    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatEventTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <>
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between lg:items-center w-full">
                    <h1 className="font-coolvetica text-lg lg:text-xl font-bold text-aciu-border-grey">
                        Branch Events ({events.length})
                    </h1>
                    
                    <div className="flex gap-4 items-center ">
                        <div className="hidden lg:block">
                            <SearchBar 
                                onSearch={handleSearch} 
                                placeholder="Search for events" 
                            />
                        </div>
                        <button 
                            className="flex gap-2.5 items-center p-2.5 
                            text-sm text-grayscale-100 rounded-md 
                            font-montserrat font-medium min-h-[50px] 
                            border border-aciu-card-grey"
                        >
                            Filter
                            <Sort variant="Outline" color="#A4ACB9" size={20} />
                        </button>
                        <button 
                            className="flex gap-2.5 items-center p-2.5
                            text-sm text-grayscale-100 rounded-md 
                            font-montserrat font-medium min-h-[50px]
                            border border-aciu-card-grey"
                        >
                            Monthly
                            <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
                        </button>
                        <button 
                            className="flex gap-2.5 items-center p-2.5
                            text-sm text-grayscale-100 rounded-md 
                            font-montserrat font-medium min-h-[50px]
                            border border-aciu-card-grey"
                        >
                            2022
                            <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
                        </button>
                    </div>
                </div>    
            </div>

            {filteredEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-aciu-abriba text-lg mb-2">
                        No events found
                    </div>
                    <p className="text-aciu-border-grey">
                        {query ? 'Try adjusting your search terms' : 'This branch has no upcoming events'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredEvents.map((event) => (
                        <EventItem
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            img={event.image}
                            host="Branch Event" 
                            date={formatEventDate(event.date)}
                            time={formatEventTime(event.date)}
                            description={event.description}
                            location={event.location}
                        />
                    ))}
                </div>
            )}
        </>
    )
}