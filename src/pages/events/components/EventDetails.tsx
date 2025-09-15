import type { DetailCardProps } from "@/utils/types";
import { Receipt2 } from "iconsax-react"
import { useParams } from "react-router-dom";
import DetailCard from "./DetailCard";
import { eventDetails } from "@/utils/data";

const isMobile = window.innerWidth < 768;;
const details: DetailCardProps[] = [
    {
        icon: <Receipt2 size={isMobile ? 26 : 32} color="#00B686" variant="Bulk"/>,
        title: "Entry Fee",
        content: "NGN 5000"
    },
    {
        icon: <img src="/icons/dress-icon.svg" width={isMobile ? 26 : 32} height={isMobile ? 26 : 32} />,
        title: "Dress Code",
        content: "Traditional"
    },
    {
        icon: <img src="/icons/guest-icon.svg" width={isMobile ? 26 : 32} height={isMobile ? 26 : 32}/>,
        title: "Guest Expectation",
        content: "300 Members"
    }
]

export default function EventDetails() {
    const { 
        img,
        branch,
        title,
        content,
        eventDate,
        eventTime,
        eventLocation,
        eventHighlights 
    } = eventDetails;
    
    const { id } = useParams();

    return (
        <div key={id} className="flex flex-col gap-8 p-4">
            <div className="flex flex-col lg:flex-row gap-5">
                <img
                    src={img}
                    alt="Event Image"
                    height={310}
                    className="rounded-[.625rem] max-h-[19.375rem] min-h-[10.875rem]"
                />
                <div className="flex flex-col gap-4">
                    <div className="rounded-md
                        py-[.625rem] px-[.859rem] max-w-fit 
                        font-coolvetica text-sm text-aciu-border-grey 
                        bg-aciu-yellow"
                    >
                        {branch}
                    </div>
                    <p className="text-aciu-border-grey text-[2rem] font-coolvetica">
                        {title}
                    </p>
                    <p className="font-montserrat text-aciu-border-grey">
                        {content}
                    </p>
                </div>
            </div>
            <div className="bg-aciu-bg-grey 
                    px-[3.438rem] lg:px-[5.5rem] py-[3.438rem] 
                    rounded-[1.25rem] flex flex-col gap-9 lg:flex-row lg:gap-0 
                    items-center justify-between">
                <div className="flex flex-col gap-3 items-center lg:items-start">
                    <p className="font-montserrat text-sm text-aciu-abriba">
                        Event Date
                    </p>
                    <p className="font-montserrat font-semibold text-aciu-border-grey">
                        {eventDate}
                    </p>
                </div>
                <div className="border-b-2 w-[9rem] lg:w-0 lg:border-r-2 lg:h-5 text-aciu-dark-grey" color="#C9C9C9"></div>
                <div className="flex flex-col gap-3 items-center lg:items-start">
                    <p className="font-montserrat text-sm text-aciu-abriba">
                        Event Time
                    </p>
                    <p className="font-montserrat font-semibold text-aciu-border-grey">
                        {eventTime}
                    </p>
                </div>
                <div className="border-b-2 w-[9rem] lg:w-0 lg:border-r-2 lg:h-5 text-aciu-dark-grey" color="#C9C9C9"></div>
                <div className="flex flex-col gap-3 items-center lg:items-start">
                    <p className="font-montserrat text-sm text-aciu-abriba">
                        Location
                    </p>
                    <p className="font-montserrat font-semibold text-aciu-border-grey text-center">
                        {eventLocation}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-8 items-center">
                <h1 className="text-center text-2xl lg:text-4xl font-coolvetica text-aciu-darker-grey">
                    Registration Ends in:
                </h1>
                <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full">
                    {/* Change to link component */}
                    <button className="w-full lg:w-fit p-6 rounded-[.625rem] bg-aciu-green-normal font-coolvetica text-white">
                        Register for Event
                    </button>
                    <button className="w-full lg:w-fit p-6 rounded-[.625rem] text-aciu-green-normal font-coolvetica border border-aciu-green-normal">
                        Donate to event
                    </button>
                </div>
            </div>
            <div className="py-[3.75rem] px-12 lg:px-[6.25rem] flex flex-col gap-6 lg:gap-12 items-center">
                <h1 className="font-bold text-center text-2xl lg:text-4xl font-coolvetica text-aciu-darker-grey">
                    Event Highlights
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 row-auto lg:gap-y-[3.25rem]">
                    {eventHighlights.map((highlight: string, index: number) => (
                        <div className="flex flex-col gap-4 items-center" key={index}>
                            <img width={18} height={18} src="/icons/highlights-icon.svg" alt="Highlights icon" />
                            <p className="font-montserrat text-sm lg:text-xl text-aciu-abriba text-center">
                                {highlight}
                            </p>
                        </div>
                    ))}     
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                {details.map(({ icon, title, content }, index) => (
                    <DetailCard key={index} icon={icon} title={title} content={content} />
                ))}
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full">
                    {/* Change to link component */}
                    <button className="w-full lg:w-fit p-6 rounded-[.625rem] bg-aciu-green-normal font-coolvetica text-white">
                        Register for Event
                    </button>
                    <button className="w-full lg:w-fit p-6 rounded-[.625rem] text-aciu-green-normal font-coolvetica border border-aciu-green-normal">
                        Share event
                    </button>
                </div>
        </div>
    )
}