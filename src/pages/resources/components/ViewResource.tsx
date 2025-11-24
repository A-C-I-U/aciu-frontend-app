import type { FileViewDrawerProps } from "@/utils/types";
import { useState } from "react";
import ResourceContent from "./ViewResourceContent";
import { SuccessDialog } from "@/components/SuccessDialog";
import { MarkIcon } from "@/components/Icons";
import ShellModal from "@/components/ShellModal";


// Retrieve file using id in `ResourceContent` instead of passing props
export default function ViewResource({
    open,
    onClose,
}: FileViewDrawerProps) {
    const [openEditSuccess, setOpenEditSuccess] = useState(false)

    return (
        <>
            <ShellModal
                open={open}
                onClose={onClose}
            >
                <ResourceContent
                    open={open}
                    onClose={onClose}
                    onSuccess={() => {
                        setOpenEditSuccess(true)
                        onClose()
                    }}
                />
            </ShellModal>
            <SuccessDialog
                open={openEditSuccess}
                onClose={() => setOpenEditSuccess(false)}
                title="Resource updated successfully"
                message="Your file has been updated."
                icon={<MarkIcon />}
                primaryAction={{
                    label: "Go back to Resources",
                    onClick: () => setOpenEditSuccess(false)
                }}
            />
        </>
    )
}