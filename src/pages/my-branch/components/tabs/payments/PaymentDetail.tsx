import { StatusBadge } from "@/components/StatusBadge";
import { branchPaymentStatusMap } from "@/utils/helpers";
import type { BranchPaymentsDataType } from "@/utils/types";
import { formatDate } from "date-fns";

export default function PaymentDetailTable({
    payment
}: { payment: BranchPaymentsDataType }) {
    const { label, labelColor, dotColor, bgColor } = branchPaymentStatusMap[payment.status as BranchPaymentsDataType["status"]];
    return (
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
                        <tr>
                            <td className="payment-table-column title">Transaction ID</td>
                            <td className="payment-table-column desc">{payment.id}</td>
                        </tr>
                        <tr>
                            <td className="payment-table-column title">Member Name</td>
                            <td className="payment-table-column desc">{payment.memberName}</td>
                        </tr>
                        <tr>
                            <td className="payment-table-column title">Payment Type</td>
                            <td className="payment-table-column desc">{payment.type}</td>
                        </tr>
                        <tr>
                            <td className="payment-table-column title">Payment Title</td>
                            <td className="payment-table-column desc">{payment.title}</td>
                        </tr>
                        <tr>
                            <td className="payment-table-column title">Amount Paid</td>
                            <td className="payment-table-column desc">{`N${Number(payment.amountPaid).toLocaleString()}`}</td>
                        </tr>
                        <tr>
                            <td className="payment-table-column title">Date Paid</td>
                            <td className="payment-table-column desc">{formatDate(payment.date, "dd-MM-yyyy h:mm  aaaaa'm'")}</td>
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
    )
}