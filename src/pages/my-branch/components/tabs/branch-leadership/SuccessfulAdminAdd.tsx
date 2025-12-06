import { MarkIcon } from "@/components/Icons";
import { SuccessDialog } from "@/components/SuccessDialog";
import type { DialogFuncProps } from "@/utils/types";

export default function SuccessfulAdminAdd({
    memberIdentity, addAdmin, open, onClose
}: DialogFuncProps & { addAdmin: () => void, memberIdentity: { name: string, role: string }}) {
    const { name, role } = memberIdentity;

    return (
        <SuccessDialog
            open={open}
            onClose={onClose}
            icon={<MarkIcon />}
            title="Executive Successfully Assigned"
            message={(
                <><span className="font-medium capitalize">"{name}"</span> has been assigned the role of <span className="font-medium capitalize">"{role}"</span></>
            )}
            primaryAction={{
                label: "Return to the Leadership List",
                onClick: onClose
            }}
            secondaryAction={{
                label: "Add Another Executive",
                onClick: () => {
                    onClose();
                    addAdmin();
                }
            }}
        />
    )
}