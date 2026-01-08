import { MarkIcon } from "@/components/Icons";
import { SuccessDialog } from "@/components/SuccessDialog";
import type { DialogFuncProps } from "@/utils/types";
import { useNavigate } from "react-router-dom";

export default function SuccessfulDueCreation({
    dueTitle, addBranchDues, open, onClose
}: DialogFuncProps & { dueTitle: string, addBranchDues: () => void }) {
    const navigate = useNavigate();

    return (
        <SuccessDialog
            open={open}
            onClose={onClose}
            icon={<MarkIcon />}
            title="Dues Created Successfully"
            message={(
                <span className="leading-[160%]">Your dues item <span className="font-medium leading-[160%]">{dueTitle}</span> has been created and is now active.</span>
            )}
            primaryAction={{
                label: "Go back to Dashboard",
                onClick: () => {
                    onClose();
                    navigate("/dashboard")
                }
            }}
            secondaryAction={{
                label: "Create Another Dues",
                onClick: () => {
                    onClose();
                    addBranchDues();
                }
            }}
        />
    )
}