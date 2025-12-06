import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import type { DialogFuncProps } from "@/utils/types";
import { Divider } from "@mui/material";
import SubmitRequestForm from "./SubmitRequestForm";

export default function SubmitWithdrawalRequest({ open, onClose }: DialogFuncProps) {
    return (
        <ShellModal
            open={open}
            onClose={onClose}
        >
            <div className="resources-modal-section">
                <ShellHeader title="Withdrawal Request" onClose={onClose} />
                <Divider className="flex shrink-0" />
                <SubmitRequestForm onClose={onClose}/>
            </div>
        </ShellModal>
    )
}