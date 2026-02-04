import ShellModal from "@/components/ShellModal";
import { Divider } from "@mui/material";
import PaymentDetailTable from "./PaymentDetail";
import ShellHeader from "@/components/ShellHeader";
import { usePaymentDetails } from "@/services/hooks/branch";
import type { BranchPaymentsDataType } from "@/utils/types";

export default function ViewPayment({ open, onClose, payment }: {
    open: boolean,
    onClose: () => void,
    payment: BranchPaymentsDataType | null
}) {
    const { data: paymentDetails, isLoading } = usePaymentDetails(payment?.id || null);

    if (!payment) return null;

    return (
        <ShellModal
            open={open}
            onClose={onClose}
        >
            <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                <ShellHeader title="View Payment" onClose={onClose} />
                <Divider className="flex shrink-0" />
                <PaymentDetailTable payment={paymentDetails} isLoading={isLoading} />
            </div>
        </ShellModal>
    )
}