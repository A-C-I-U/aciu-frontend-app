import ShellModal from "@/components/ShellModal";
import { Divider } from "@mui/material";
import ShellHeader from "@/components/ShellHeader";
import { branchPaymentStatusMap } from "@/utils/helpers";
import { ViewDetailRow } from "@/components/ViewDetailRow";
import { formatDate } from "date-fns";
import { StatusBadge } from "@/components/StatusBadge";
import type { BranchPaymentsDataType } from "@/utils/types";

// Retrieve id instead
export default function ViewPayment({ open, onClose, payment }: {
    open: boolean,
    onClose: () => void,
    payment: BranchPaymentsDataType | null
}) {    
    if (!payment) return null;
    
    return (
        <ShellModal
            open={open}
            onClose={onClose}
        >
            <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                <ShellHeader title="View Payment" onClose={onClose} />
                <Divider className="flex shrink-0" />
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="resources-modal-body pb-6">
                        {payment &&
                            (<>
                            {(() => {
                                const { label, labelColor, dotColor, bgColor } = branchPaymentStatusMap[payment.status]
                                    return (
                                    <div className="flex flex-col gap-4">
                                        <div className="overflow-x-auto scroll-unset pb-2 w-full">
                                        <table className="table-auto border-collapse min-w-2xs w-full">
                                            <thead>
                                                <tr className="text-left">
                                                    <th className="payment-table-column title">Title</th>
                                                    <th className="payment-table-column desc">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <ViewDetailRow label="Transaction ID" content={payment.id} />
                                                <ViewDetailRow label="Member's Name" content={payment.memberName ?? "null"} />
                                                <ViewDetailRow label="Payment Type" content={payment.type ?? "null"} />
                                                <ViewDetailRow label="Payment Title" content={payment.title} />
                                                <ViewDetailRow label="Amount Paid" content={`N${Math.round(+payment.amountPaid).toLocaleString()}`} />
                                                <ViewDetailRow label="Date Paid" content={formatDate(payment.date, "dd-MM-yyyy h:mm  a")} />
                                                <ViewDetailRow label="Payment Status" content={<StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} />} />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>)
                            })()}
                            </>
                        )}
                    </div>
                    <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 shrink-0">
                        <button className="btn btn-primary">
                            Download Receipt
                        </button>
                    </div>
                </div>
            </div>
        </ShellModal>
    )
}