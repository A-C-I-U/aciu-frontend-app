import ShellModal from "@/components/ShellModal";
import type { BranchPaymentsDataType } from "@/utils/types";
import { Divider } from "@mui/material";
import PaymentDetailTable from "./PaymentDetail";
import ShellHeader from "@/components/ShellHeader";

export default function ViewPayment({ open, onClose, payment }: {
    open: boolean,
    onClose: () => void,
    payment: BranchPaymentsDataType
}) {    
    return (
        <ShellModal
            open={open}
            onClose={onClose}
        >
            <div className="resources-modal-section flex flex-col h-4/5 md:h-full overflow-hidden">
                <ShellHeader title="View Payment" onClose={onClose} />
                <Divider className="flex-shrink-0" />
                <PaymentDetailTable payment={payment} />
            </div>
        </ShellModal>
    )
}