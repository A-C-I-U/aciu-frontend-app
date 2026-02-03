import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import type { DialogFuncProps } from "@/utils/types";
import { Divider } from "@mui/material";
import BranchDuesForm from "./BranchDuesForm";

// Can add successful dues creation here under `<>/</>` as a sibling to shell modal
export default function AddBranchDues({ open, onClose, onSuccess }: DialogFuncProps & { onSuccess: (values: any) => void }) {
    return (
        <ShellModal
            open={open}
            onClose={onClose}
        >
            <div className="resources-modal-section">
                <ShellHeader title="Add New Branch Dues" onClose={onClose} />
                <Divider className="flex shrink-0" />
                <BranchDuesForm onClose={onClose} onSuccess={onSuccess} />
            </div>
        </ShellModal>
    )
}