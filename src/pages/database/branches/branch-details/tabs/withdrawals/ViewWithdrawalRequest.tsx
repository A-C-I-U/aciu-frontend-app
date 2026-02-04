import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { StatusBadge } from "@/components/StatusBadge";
import { ViewDetailRow } from "@/components/ViewDetailRow";
import { withdrawalStatusMap } from "@/utils/helpers";
import type { WithdrawalDataType } from "@/utils/types";
import { Divider } from "@mui/material";
import { formatDate } from "date-fns";

export default function ViewWithdrawalRequest({ open, onClose, withdrawal }: {
    open: boolean,
    onClose: () => void,
    withdrawal: WithdrawalDataType | null }) {
    if (!withdrawal) return null;

    const { label, labelColor, dotColor, bgColor } = withdrawalStatusMap[withdrawal.status]
    const { title, id, submittedBy, reasons, type, amount, date, source } = withdrawal;
    return (
         <ShellModal
            open={open}
            onClose={onClose}
        >
            <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                <ShellHeader title="View Request" onClose={onClose} />
                <Divider className="flex shrink-0" />
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="resources-modal-body">               
                        <table>
                            <thead>
                                <tr className="text-left">
                                    <th className="payment-table-column title">Title</th>
                                    <th className="payment-table-column desc">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ViewDetailRow label="Transaction ID" content={id} />
                                <ViewDetailRow label="Submitted By" content={submittedBy} />
                                <ViewDetailRow label="Reason" content={reasons} />
                                <ViewDetailRow label="Payment Type" content={type} />
                                <ViewDetailRow label="Payment Title" content={title} />
                                <ViewDetailRow label="Amount" content={`N${Math.round(+amount).toLocaleString()}`} />
                                <ViewDetailRow label="Source" content={source} />
                                <ViewDetailRow label="Date Paid" content={formatDate(date, "dd-MM-yyyy h:mm  a")} />
                                <ViewDetailRow label="Payment Status" content={<StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} />} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ShellModal>
    )
}