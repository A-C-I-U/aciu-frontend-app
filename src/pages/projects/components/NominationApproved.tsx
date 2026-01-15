import { MarkIcon } from "@/components/Icons";
import { SuccessDialog } from "@/components/SuccessDialog";
import type { DialogFuncProps } from "@/utils/types";
import { useNavigate } from "react-router-dom";

export default function NominationApproved({
    open,
    onClose
}: DialogFuncProps) {
    const navigate = useNavigate();
    
    return (
        <SuccessDialog
            open={open}
            onClose={onClose}
            icon={<MarkIcon />}
            fitActionButton
            title="Uploaded Successfully!"
            message="Your project has been posted successfully and opened for donations."
            primaryAction={{
                label: "Go back to projects",
                onClick: () => {
                    onClose();
                    navigate(`/projects`)
                }
            }}
        />
    )
}