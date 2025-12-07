import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import type { DialogFuncProps } from "@/utils/types";
import { Divider } from "@mui/material";
import BranchDuesForm from "./BranchDuesForm";

export default function AddBranchDues({ open, onClose, onSuccess }: DialogFuncProps & { onSuccess: () => void }) {
    return (
        <ShellModal
            open={open}
            onClose={onClose}
        >
            <div className="resources-modal-section">
                <ShellHeader title="Withdrawal Request" onClose={onClose} />
                <Divider className="flex shrink-0" />
                <BranchDuesForm onClose={onClose} onSuccess={onSuccess} />
            </div>
        </ShellModal>
    )
}