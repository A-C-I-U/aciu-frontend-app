import type { DialogFuncProps } from "@/utils/types";
import { useState } from "react";
import UploadResourceContent from "./UploadResourceContent";
import { SuccessDialog } from "@/components/SuccessDialog";
import { MarkIcon } from "@/components/Icons";
import { useNavigate } from "react-router-dom";
import ShellModal from "@/components/ShellModal";

export default function UploadResource({
    open, onClose
}: DialogFuncProps) {
    const [openSuccessPrompt, setOpenSuccessPrompt] = useState(false)
    const navigate = useNavigate();

    return (
         <>
            <ShellModal
                open={open}
                onClose={onClose}
            >
                <UploadResourceContent
                    onClose={onClose}
                    onSuccess={() => {
                        onClose();
                        setOpenSuccessPrompt(true);
                    }}
                />
            </ShellModal>
            <SuccessDialog
                open={openSuccessPrompt}
                onClose={() => setOpenSuccessPrompt(false)}
                icon={<MarkIcon />}
                title="Resource Uploaded Successfully"
                message="Your file has been added to the community library and is now accessible to eligible members."
                primaryAction={{
                    label: "Go back to Resources",
                    onClick: () => {
                        navigate('/resources')
                        setOpenSuccessPrompt(false)
                    }
                }}
            />
        </>
    )
}