import { MarkIcon } from "@/components/Icons";
import { SuccessDialog } from "@/components/SuccessDialog";
import type { DialogFuncProps } from "@/utils/types"
import { useNavigate } from "react-router-dom"

export default function SuccessfulUpload({
    open, onClose, imageNumber
}: DialogFuncProps & { imageNumber: number }) {
    const navigate = useNavigate();

    return (
        <SuccessDialog
            open={open}
            onClose={onClose}
            icon={<MarkIcon />}
            title="Gallery Upload Successful"
            message={(
                <>You just uploaded <span className="font-medium capitalize">"{imageNumber}"</span> and they’re now live in your branch’s gallery section for members to view.</>
            )}
            primaryAction={{
                label: "Go back to dashboard",
                onClick: () => navigate("/dashboard")
            }}
        />
    )
}