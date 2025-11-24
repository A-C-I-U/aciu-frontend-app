// import { EventItem } from "@/pages/events/components/EventItem";
// import { upcomingEvents } from "@/utils/data";
// import { useState } from "react";
// import SearchBar from "@/components/SearchBar"
// import { ArrowDown2, Sort } from "iconsax-react"


// export default function EventsList() {
//     const [ query, setQuery ] = useState("");
        
//     const handleSearch = (q: string) => {
//         setQuery(q);
//         console.log(query);
//     }

//     return (
//         <>
//          <div className="flex justify-between items-center w-full">
//                 <div className="flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between lg:items-center w-full">
//                     <h1 className="font-coolvetica text-lg lg:text-xl font-bold text-aciu-border-grey">
//                         Upcoming Events
//                     </h1>
                    
//                     <div className="flex gap-4 items-center ">
//                         <div className="hidden lg:block">
//                             <SearchBar 
//                                 onSearch={handleSearch} 
//                                 placeholder="Search for events" 
//                             />
//                         </div>
//                         <button 
//                             className="flex gap-2.5 items-center p-2.5 
//                             text-sm text-grayscale-100 rounded-md 
//                             font-montserrat font-medium min-h-[50px] 
//                             border border-aciu-card-grey"
//                         >
//                             Filter
//                             <Sort variant="Outline" color="#A4ACB9" size={20} />
//                         </button>
//                         <button 
//                             className="flex gap-2.5 items-center p-2.5
//                             text-sm text-grayscale-100 rounded-md 
//                             font-montserrat font-medium min-h-[50px]
//                             border border-aciu-card-grey"
//                         >
//                             Monthly
//                             <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
//                         </button>
//                         <button 
//                             className="flex gap-2.5 items-center p-2.5
//                             text-sm text-grayscale-100 rounded-md 
//                             font-montserrat font-medium min-h-[50px]
//                             border border-aciu-card-grey"
//                         >
//                             2022
//                             <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
//                         </button>
//                     </div>
//                 </div>    
//             </div>
//          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {upcomingEvents.map(({ id, title, img, host, date, time }, index) => (
//                     <EventItem
//                         key={index}
//                         id={id}
//                         title={title}
//                         img={img}
//                         host={host}
//                         date={date}
//                         time={time}
//                     />
//                 ))}
//             </div>
//         </>
//     )
// }


import type { EventItemProps } from "@/utils/types"
import { Icon } from "@iconify/react/dist/iconify.js"
import { NavLink } from "react-router-dom"

export const EventItem = ({
    id,
    title,
    img,
    host,
    date,
    time,
    description,
    location
}: EventItemProps) => {
    
    return (
        <div
            key={id}
            className={`flex flex-col gap-4 rounded-lg border border-aciu-dark-grey py-2.5 px-2 lg:px-3.5`}>
            <span className="flex flex-col gap-3.5">
                <img 
                    src={img} 
                    height={145}
                    className="rounded-sm object-cover w-full" 
                    alt="Event image" 
                    onError={(e) => {
                        e.currentTarget.src = '/images/event-placeholder.jpg';
                    }}
                />
                <span className={[
                    "bg-aciu-yellow rounded-md ",
                    "flex items-center justify-center ",
                    "font-semibold text-xs font-coolvetica text-aciu-border-grey",
                    "py-1.5 px-2.5 max-w-fit h-7"
                ].join("")}>
                    {host}
                </span>
            </span>
            <span className="flex flex-col gap-7">
                <span className="text-lg font-coolvetica font-semibold text-aciu-border-grey line-clamp-2">
                    {title}
                </span>
                
                {location && (
                    <span className="flex items-center gap-2 text-sm text-aciu-darker-grey">
                        <Icon icon="mdi:location" width="16" height="16" />
                        {location}
                    </span>
                )}
                
                {description && (
                    <p className="text-sm text-aciu-abriba line-clamp-3">
                        {description}
                    </p>
                )}
                
                <span className="flex justify-between items-center">
                    <span className="flex flex-col gap-2.5">
                        <span className="text-xs font-montserrat text-aciu-dark-red">
                            Event Date
                        </span>
                        <span className="font-montserrat font-semibold text-sm md:text-xs lg:text-sm text-aciu-darker-grey whitespace-nowrap">
                            {date}
                        </span>
                    </span>
                    <span className="border-[1.69px] border-aciu-dark-grey h-4"></span>
                    <span className="flex flex-col gap-2.5">
                        <span className="text-xs font-montserrat text-aciu-dark-red">
                            Event Time
                        </span>
                        <span className="font-montserrat font-semibold text-sm md:text-xs lg:text-sm text-aciu-darker-grey whitespace-nowrap">
                            {time}
                        </span>
                    </span>
                </span>
                <NavLink
                    to={`/events/${id}`}
                    className={[
                        "border border-aciu-red rounded-lg max-w-fit flex justify-center items-center gap-2 px-5 py-3"
                    ].join("")}
                >
                    <span className="font-coolvetica text-sm text-aciu-red font-semibold">Learn more</span>
                    <Icon icon="ic:round-arrow-back" width="20" height="20" color="#00CA71" className="transform rotate-[135deg]"/>
                </NavLink>
            </span>
        </div>
    )
}