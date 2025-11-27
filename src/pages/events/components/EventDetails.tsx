import { Receipt2 } from "iconsax-react";
import { useParams, useNavigate } from "react-router-dom";
import DetailCard from "./DetailCard";
import { CustomCountdown } from "@/components/MonthlyCountdown";
import { useEventDetails } from "@/services/hooks/events";
import { EventItemSkeleton } from "@/components/EventSkeleton";
import { enqueueSnackbar } from "notistack";
import { Icon } from "@iconify/react";

const isMobile = window.innerWidth < 768;

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useEventDetails(id!);

  if (error) {
    enqueueSnackbar(`Error loading event details: ${error.message}`, {
      variant: "error",
    });
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 p-4">
        <EventItemSkeleton />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col gap-8 p-4">
        <div className="text-center py-12">
          <p className="text-aciu-abriba text-lg">Event not found.</p>
        </div>
      </div>
    );
  }

  const { event } = data;

  const details = [
    {
      icon: (
        <Receipt2 size={isMobile ? 26 : 32} color="#00B686" variant="Bulk" />
      ),
      title: "Entry Fee",
      content: `NGN ${parseFloat(event.entryFee).toLocaleString()}`,
    },
    {
      icon: (
        <img
          src="/icons/dress-icon.svg"
          width={isMobile ? 26 : 32}
          height={isMobile ? 26 : 32}
        />
      ),
      title: "Dress Code",
      content: event.dressCode?.replace(/_/g, " ") || "Not specified",
    },
    {
      icon: (
        <img
          src="/icons/guest-icon.svg"
          width={isMobile ? 26 : 32}
          height={isMobile ? 26 : 32}
        />
      ),
      title: "Guest Expectation",
      content: `${event.guestExpectation} ${
        event.guestExpectation === 1 ? "Guest" : "Guests"
      }`,
    },
  ];

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatEventTime = (timeString: string) => {
    return timeString;
  };

  const eventDate = new Date(event.eventDate);

  return (
    <div key={event.id} className="flex flex-col gap-8 p-4">
      <button
        onClick={() => navigate("/events")}
        className="flex items-center gap-2 text-aciu-red font-coolvetica font-semibold mb-4 self-start"
      >
        <Icon icon="mdi:arrow-left" width="20" height="20" />
        Back to Events
      </button>

      <div className="flex flex-col lg:flex-row gap-5">
        <img
          src={event.coverImage || "/images/event-placeholder.jpg"}
          alt="Event Image"
          height={310}
          className="rounded-[.625rem] max-h-[19.375rem] min-h-[10.875rem] w-full lg:w-auto object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/event-placeholder.jpg";
          }}
        />
        <div className="flex flex-col gap-4">
          <div
            className="rounded-md
                        py-[.625rem] px-[.859rem] max-w-fit 
                        font-coolvetica text-sm text-aciu-border-grey 
                        bg-aciu-yellow"
          >
            {event.category?.replace(/_/g, " ") || "Event"}
          </div>
          <p className="text-aciu-border-grey text-[2rem] font-coolvetica">
            {event.title}
          </p>
          <p className="font-montserrat text-aciu-border-grey">
            {event.description}
          </p>
        </div>
      </div>

      <div
        className="bg-aciu-bg-grey 
                    px-[3.438rem] lg:px-[5.5rem] py-[3.438rem] 
                    rounded-[1.25rem] flex flex-col gap-9 lg:flex-row lg:gap-0 
                    items-center justify-between"
      >
        <div className="flex flex-col gap-3 items-center lg:items-start">
          <p className="font-montserrat text-sm text-aciu-abriba">Event Date</p>
          <p className="font-montserrat font-semibold text-aciu-border-grey">
            {formatEventDate(event.eventDate)}
          </p>
        </div>
        <div
          className="border-b-2 w-[9rem] lg:w-0 lg:border-r-2 lg:h-5 text-aciu-dark-grey"
          color="#C9C9C9"
        ></div>
        <div className="flex flex-col gap-3 items-center lg:items-start">
          <p className="font-montserrat text-sm text-aciu-abriba">Event Time</p>
          <p className="font-montserrat font-semibold text-aciu-border-grey">
            {formatEventTime(event.startTime)} -{" "}
            {formatEventTime(event.endTime)}
          </p>
        </div>
        <div
          className="border-b-2 w-[9rem] lg:w-0 lg:border-r-2 lg:h-5 text-aciu-dark-grey"
          color="#C9C9C9"
        ></div>
        <div className="flex flex-col gap-3 items-center lg:items-start">
          <p className="font-montserrat text-sm text-aciu-abriba">Location</p>
          <p className="font-montserrat font-semibold text-aciu-border-grey text-center">
            {event.location}
          </p>
        </div>
      </div>

      {event.enableCountdown && (
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-center text-2xl lg:text-4xl font-coolvetica text-aciu-darker-grey">
            Registration Ends in:
          </h1>
          <CustomCountdown targetDate={eventDate} variant="inline" />
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full">
            {event.enableRSVP && (
              <button className="w-full lg:w-fit p-6 rounded-[.625rem] bg-aciu-green-normal font-coolvetica text-white">
                Register for Event
              </button>
            )}
            {event.enableDonations && (
              <button className="w-full lg:w-fit p-6 rounded-[.625rem] text-aciu-green-normal font-coolvetica border border-aciu-green-normal">
                Donate to event
              </button>
            )}
          </div>
        </div>
      )}

      {event.highlights && event.highlights.length > 0 && (
        <div className="py-[3.75rem] px-12 lg:px-[6.25rem] flex flex-col gap-6 lg:gap-12 items-center">
          <h1 className="font-bold text-center text-2xl lg:text-4xl font-coolvetica text-aciu-darker-grey">
            Event Highlights
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 row-auto lg:gap-y-[3.25rem]">
            {event.highlights.map((highlight: string, index: number) => (
              <div className="flex flex-col gap-4 items-center" key={index}>
                <img
                  width={18}
                  height={18}
                  src="/icons/highlights-icon.svg"
                  alt="Highlights icon"
                />
                <p className="font-montserrat text-sm lg:text-xl text-aciu-abriba text-center">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {details.map(({ icon, title, content }, index) => (
          <DetailCard key={index} icon={icon} title={title} content={content} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full">
        {event.enableRSVP && (
          <button className="w-full lg:w-fit p-6 rounded-[.625rem] bg-aciu-green-normal font-coolvetica text-white">
            Register for Event
          </button>
        )}
        <button className="w-full lg:w-fit p-6 rounded-[.625rem] text-aciu-green-normal font-coolvetica border border-aciu-green-normal">
          Share event
        </button>
      </div>
    </div>
  );
}
