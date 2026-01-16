import { ArrowLeft, Receipt2 } from "iconsax-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DetailCard from "./DetailCard";
import { CustomCountdown } from "@/components/MonthlyCountdown";
import { useEventDetails } from "@/services/hooks/events";
import { enqueueSnackbar } from "notistack";
import { format, formatDate, parse } from "date-fns";
import { useUser } from "@/context/UserContext";
import { useMediaQuery } from "@mui/material";
import ShareEvent from "./ShareEvent";
import { useState } from "react";
import PageDetailSkeleton from "@/components/PageDetailSkeleton";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [showShareEvent, setShowShareEvent] = useState(false);

  const { data, isLoading, error } = useEventDetails(id!);

  if (error) {
    enqueueSnackbar(`Error loading event details: ${error.message}`, {
      variant: "error",
    });
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 p-4">
        <PageDetailSkeleton />
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
          alt=""
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
          alt=""
        />
      ),
      title: "Guest Expectation",
      content: `${event.guestExpectation} ${
        event.guestExpectation === 1 ? "Guest" : "Guests"
      }`,
    },
  ];

  const eventDate = new Date(event.eventDate);
  return (
    <>
      <div key={event.id} className="flex flex-col gap-6.25 mb-10">
        <button
          type="button"
          onClick={() => navigate("/events")}
          className="cancel-btn"
        >
          <ArrowLeft size={20} color="#898483" />
          <span className="ml-3">Cancel</span>
        </button>

        <div className="mx-5 bg-white rounded-white py-4 flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row gap-5 px-4">
            <img
              src={event.coverImage || "/images/event-placeholder.jpg"}
              alt="Event Image"
              height={310}
              className="rounded-2xs max-h-[19.375rem] min-h-[10.875rem] w-full lg:w-auto object-cover"
              onError={(e) => {
                e.currentTarget.src = "/images/event-placeholder.jpg";
              }}
            />
            <div className="flex flex-col gap-2 md:gap-4">
              <div
                className="event-tag"
              >
                {event.category?.replace(/_/g, " ").toLowerCase() || "Event"}
              </div>
              <p className="text-aciu-border-grey text-xl md:text-[2rem] font-coolvetica leading-default">
                {event.title}
              </p>
              <p className="text-sm md:text-base font-montserrat text-aciu-border-grey leading-6">
                {event.description}
              </p>
            </div>
          </div>

          <div
            className="bg-aciu-bg-grey 
              px-13.75 lg:px-22 py-13.75 mx-3 lg:mx-8.25
              rounded-[1.25rem] flex flex-col gap-9 lg:flex-row lg:gap-0 
              items-center justify-between"
          >
            <div className="flex flex-col gap-3 items-center lg:items-start">
              <p className="text-sm text-aciu-abriba leading-default">Event Date</p>
              <p className="font-semibold text-aciu-border-grey leading-default">
                {formatDate(event.eventDate, "do MMMM yyyy")}
              </p>
            </div>
            <div
              className="border-b-2 w-36 lg:w-0 lg:border-r-2 lg:h-5 text-aciu-dark-grey"
              color="#C9C9C9"
            ></div>
            <div className="flex flex-col gap-3 items-center lg:items-start">
              <p className="text-sm text-aciu-abriba leading-default">Event Time</p>
              <p className="font-semibold text-aciu-border-grey leading-default">
                {format(parse(event.startTime, "HH:mm", new Date()), "h:mm a")} - {format(parse(event.endTime, "HH:mm", new Date()), "h:mm a")}
              </p>
            </div>
            <div
              className="border-b-2 w-36 lg:w-0 lg:border-r-2 lg:h-5 text-aciu-dark-grey"
              color="#C9C9C9"
            ></div>
            <div className="flex flex-col gap-3 items-center lg:items-start">
              <p className="text-sm text-aciu-abriba leading-default">Location</p>
              <p className="font-semibold text-aciu-border-grey text-center leading-default">
                {event.location}
              </p>
            </div>
          </div>


            <div className="flex flex-col gap-8 items-center mx-5">
              {event.enableCountdown && (
                <>
                  <h1 className="text-center text-2xl lg:text-4xl font-coolvetica text-aciu-darker-grey leading-15">
                    Registration Ends in:
                  </h1>
                  <CustomCountdown targetDate={eventDate} variant="inline" />
                </>
              )}

              {user?.role !== "national_admin" && (
                <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full">
                  {event.enableRSVP && (
                    <button className="btn-event btn-event-primary">
                      Register for Event
                    </button>
                  )}
                  {event.enableDonations && (
                    <button className="btn-event btn-event-secondary">
                      Donate to event
                    </button>
                  )}
                </div>
              )}
              
            </div>

          

          {event.highlights && event.highlights.length > 0 && (
            <div className="py-15 px-12 lg:px-25 flex flex-col gap-6 lg:gap-12 items-center bg-aciu-bg-grey">
              <h1 className="font-bold text-center text-2xl lg:text-4xl font-coolvetica text-aciu-darker-grey">
                Event Highlights
              </h1>
              <div className="grid lg:grid-cols-3 gap-y-6 row-auto lg:gap-y-13">
                {event.highlights.map((highlight: string, index: number) => (
                  <div className="flex flex-col gap-4 items-center" key={index}>
                    <img
                      width={18}
                      height={18}
                      src="/icons/highlights-icon.svg"
                      alt="Highlights icon"
                    />
                    <p className="text-sm lg:text-xl text-aciu-abriba text-center">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-4 items-center mx-5 lg:mx-8.5">
            {details.map(({ icon, title, content }, index) => (
              <DetailCard key={index} icon={icon} title={title} content={content} />
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full px-3">
            {user?.role === "national_admin" ? (
              <Link className="btn-event btn-event-primary text-center" to={`/events/${event.id}/edit`}>
                Edit Event
              </Link>
            ) : event.enableRSVP ? (
              <button className="btn-event btn-event-primary">
                Register for Event
              </button>
            ) : null}
            
            <button className="btn-event btn-event-secondary" onClick={() => setShowShareEvent(true)}>
              Share event
            </button>
          </div>
        </div>
      </div>
      <ShareEvent
        link={event.shareableLink}
        open={showShareEvent}
        onClose={() => setShowShareEvent(false)}
      />
    </>
  );
}
