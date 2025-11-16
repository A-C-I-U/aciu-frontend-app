import { MarkIcon } from "@/components/Icons";
import { SuccessDialog } from "@/components/SuccessDialog";
import type { DialogFuncProps } from "@/utils/types";
import { useNavigate } from "react-router-dom";

export default function SuccessfulUpload({
    open, onClose
}: DialogFuncProps) {
    const navigate = useNavigate();

    return (
        <SuccessDialog
            open={open}
            onClose={onClose}
            icon={<MarkIcon />}
            title="Resource Uploaded Successfully"
            message="Your file has been added to the community library and is now accessible to eligible members."
            primaryAction={{
                label: "Go back to Resources",
                onClick: () => {
                    navigate('/resources')
                    onClose()
                }
            }}
        />
    )
}