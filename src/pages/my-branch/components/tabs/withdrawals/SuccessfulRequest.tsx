import { MarkIcon } from "@/components/Icons";
import { SuccessDialog } from "@/components/SuccessDialog";
import type { DialogFuncProps } from "@/utils/types";
import { useNavigate } from "react-router-dom";

export default function SuccessfulRequest({
    open, onClose
}: DialogFuncProps) {
    const navigate = useNavigate();

    return (
        <SuccessDialog
            open={open}
            onClose={onClose}
            icon={<MarkIcon />}
            title="Withdrawal Request Sent"
            message="Your request has been submitted and is now awaiting review by the finance team."
            primaryAction={{
                label: "Go back to Dashboard",
                onClick: () => {
                    onClose();
                    navigate("/dashboard");
                }
            }}
            // Function prop needed here that triggers the request detail by id
            secondaryAction={{
                label: "View Request",
                onClick: () => {
                    onClose();
                }
            }}
        />
    )
}