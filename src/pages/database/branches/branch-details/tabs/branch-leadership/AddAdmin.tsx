import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import type { DialogFuncProps } from "@/utils/types";
import { Divider } from "@mui/material";
import AddAdminForm from "./AddAdminForm";

export default function AddAdmin({
    open, onClose, onSuccess
}: DialogFuncProps & { onSuccess: (values: any) => void }) {
    return (
         <ShellModal
            open={open}
            onClose={onClose}
        >
            <div className="resources-modal-section">
                <ShellHeader title="Add a Branch Executive" onClose={onClose} />
                <Divider className="flex shrink-0" />
                <AddAdminForm onClose={onClose} onSuccess={onSuccess}/>
            </div>
        </ShellModal>
    )
}