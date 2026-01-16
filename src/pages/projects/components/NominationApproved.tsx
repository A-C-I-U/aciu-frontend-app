import { MarkIcon } from "@/components/Icons";
import { SuccessDialog } from "@/components/SuccessDialog";
import type { DialogFuncProps } from "@/utils/types";

export default function NominationApproved({
    open,
    onClose
}: DialogFuncProps) {
    
    return (
        <SuccessDialog
            open={open}
            onClose={onClose}
            icon={<MarkIcon />}
            className="!text-sm md:!text-base max-w-fit tracking-wider font-normal leading-[155%]"
            title="Uploaded Successfully!"
            message="Your project has been posted successfully and opened for donations."
            primaryAction={{
                label: "Go back to Projects",
                onClick: () => {
                    onClose();
                }
            }}
        />
    )
}