import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { StatusBadge } from "@/components/StatusBadge";
import { withdrawalStatusMap } from "@/utils/helpers";
import type { WithdrawalDataType } from "@/utils/types";
import { Divider } from "@mui/material";
import { formatDate } from "date-fns";

export default function ViewWithdrawalRequest({ open, onClose, withdrawal }: {
    open: boolean,
    onClose: () => void,
    withdrawal: WithdrawalDataType}) {
        
    const { label, labelColor, dotColor, bgColor } = withdrawalStatusMap[withdrawal.status]
    return (
         <ShellModal
            open={open}
            onClose={onClose}
        >
            <div className="resources-modal-section flex flex-col h-4/5 md:h-full overflow-hidden">
                <ShellHeader title="View Request" onClose={onClose} />
                <Divider className="flex shrink-0" />
                <div className="flex flex-col h-4/5 md:h-full overflow-hidden">
                    <div className="resources-modal-body">               
                        <table>
                            <thead>
                                <tr className="text-left">
                                    <th className="payment-table-column title">Title</th>
                                    <th className="payment-table-column desc">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="payment-table-column title">Transaction ID</td>
                                    <td className="payment-table-column desc">{withdrawal.id}</td>
                                </tr>
                                <tr>
                                    <td className="payment-table-column title">Submitted by</td>
                                    <td className="payment-table-column desc">{withdrawal.submittedBy}</td>
                                </tr>
                                <tr>
                                    <td className="payment-table-column title">Reasons</td>
                                    <td className="payment-table-column desc">{withdrawal.reasons}</td>
                                </tr>
                                <tr>
                                    <td className="payment-table-column title">Payment Type</td>
                                    <td className="payment-table-column desc">{withdrawal.type}</td>
                                </tr>
                                <tr>
                                    <td className="payment-table-column title">Payment Title</td>
                                    <td className="payment-table-column desc">{withdrawal.title}</td>
                                </tr>
                                <tr>
                                    <td className="payment-table-column title">Amount</td>
                                    <td className="payment-table-column desc">{`N${Number(withdrawal.amount).toLocaleString()}`}</td>
                                </tr>
                                <tr>
                                    <td className="payment-table-column title">Source</td>
                                    <td className="payment-table-column desc">{withdrawal.source}</td>
                                </tr>
                                <tr>
                                    <td className="payment-table-column title">Date Paid</td>
                                    <td className="payment-table-column desc">{formatDate(withdrawal.date, "dd-MM-yyyy h:mm  aaaaa'm'")}</td>
                                </tr>
                                <tr>
                                    <td className="payment-table-column title">Payment Status</td>
                                    <td className="payment-table-column desc"><StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
                        <button className="btn btn-primary">
                            Download Receipt
                        </button>
                    </div> 
                </div>
            </div>
        </ShellModal>
    )
}