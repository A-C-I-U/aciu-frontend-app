
import { EventItem } from "@/components/EventItem"
import SearchBar from "@/components/SearchBar"
import { upcomingEvents } from "@/utils/data"
import { ArrowDown2, Sort } from "iconsax-react"

export default function PastEvents() {
    return (
         <div className="flex flex-col gap-8">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex flex-col gap-4 lg:flex-row lg:gap-0 justify-between items-center w-full">
                            <h1 className="font-coolvetica text-lg font-bold text-aciu-border-grey">
                                Past Events
                            </h1>
                            <SearchBar placeholder="Search for events" />
                            <div className="flex flex-col lg:flex-row gap-4 items-center ">
                                <div className="flex gap-2 items-center">
                                    <button 
                                        className="flex gap-2.5 items-center p-2.5 
                                        text-sm text-grayscale-100 rounded-md 
                                        font-montserrat font-medium 
                                        border border-aciu-card-grey"
                                    >
                                        Filter
                                        <Sort variant="Outline" color="#A4ACB9" size={20} />
                                    </button>
                                    <button 
                                        className="flex gap-2.5 items-center p-2.5
                                        text-sm text-grayscale-100 rounded-md 
                                        font-montserrat font-medium 
                                        border border-aciu-card-grey"
                                    >
                                        Monthly
                                        <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
                                    </button>
                                    <button 
                                        className="flex gap-2.5 items-center p-2.5
                                        text-sm text-grayscale-100 rounded-md 
                                        font-montserrat font-medium 
                                        border border-aciu-card-grey"
                                    >
                                        2022
                                        <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {upcomingEvents.map(({ id, title, img, host, date, time }) => (
                            <EventItem
                                id={id}
                                title={title}
                                img={img}
                                host={host}
                                date={date}
                                time={time}
                            />
                        ))}
                    </div>
                </div>
    )
}