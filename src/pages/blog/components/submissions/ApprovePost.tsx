import { MarkIcon } from "@/components/Icons";
import { SuccessDialog } from "@/components/SuccessDialog";
import type { DialogFuncProps } from "@/utils/types";
import { useNavigate } from "react-router-dom";

export default function ApprovePost({
    id,
    open,
    onClose
}: DialogFuncProps & { id: string }) {
    const navigate = useNavigate();
    
    return (
        <SuccessDialog
            open={open}
            onClose={onClose}
            icon={<MarkIcon />}
            title="Post Approved & Published"
            message="Your review is complete. The post is now live on the community blog."
            primaryAction={{
                label: "Go back to blog",
                onClick: () => {
                    onClose();
                    navigate(`/blog`)
                }
            }}
            secondaryAction={{
                label: "View Post",
                onClick: () => {
                    onClose();
                    navigate(`/blog/submissions/${id}`)
                }
            }}
        />
    )
}