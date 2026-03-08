import { MarkIcon } from "@/components/Icons";
import { SuccessDialog } from "@/components/SuccessDialog";
import type { DialogFuncProps } from "@/utils/types";
import { useNavigate } from "react-router-dom";

export default function SuccessfulEventCreation({
    eventTitle, eventId, open, onClose
}: DialogFuncProps & { eventTitle: string, eventId: string }) {
    const navigate = useNavigate();

    return (
        <SuccessDialog
            open={open}
            onClose={onClose}
            icon={<MarkIcon />}
            title="Event Created Successfully"
            message={(
                <>Your event <span className="font-medium capitalize">"{eventTitle}"</span> is now live. Members can RSVP and support the event via their dashboard.</>
            )}
            primaryAction={{
                label: "Go to Events List",
                onClick: () => {
                    onClose();
                    navigate("/events")
                }
            }}
            secondaryAction={{
                label: "View Event",
                onClick: () => {
                    onClose();
                    navigate(`/events/${eventId}`)
                }
            }}
        />
    )
}