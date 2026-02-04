import { StatusBadge } from "@/components/StatusBadge";
import { branchPaymentStatusMap } from "@/utils/helpers";
import type { PaymentDetails } from "@/services/types/branch";
import { formatDate } from "date-fns";
import { Skeleton } from "@mui/material";

export default function PaymentDetailTable({
    payment,
    isLoading
}: { payment: PaymentDetails | undefined, isLoading: boolean }) {

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 p-4">
                <Skeleton height={40} />
                <Skeleton height={40} />
                <Skeleton height={40} />
                <Skeleton height={40} />
            </div>
        )
    }

    if (!payment) return <div className="p-4 text-center">No details available.</div>;

    const normalizedStatus = payment.status ? payment.status.toLowerCase() : "";
    const { label, labelColor, dotColor, bgColor } = branchPaymentStatusMap[normalizedStatus] || { label: payment.status || "Unknown", labelColor: "gray", dotColor: "gray", bgColor: "lightgray" };

    const getFormattedDate = () => {
        try {
            return payment.date ? formatDate(payment.date, "dd-MM-yyyy h:mm aaaaa'm'") : "N/A";
        } catch {
            return "N/A";
        }
    }

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
                            <td className="payment-table-column desc">{payment.transactionId}</td>
                        </tr>
                        <tr>
                            <td className="payment-table-column title">Payment For</td>
                            <td className="payment-table-column desc">{payment.paymentFor}</td>
                        </tr>
                        <tr>
                            <td className="payment-table-column title">Description</td>
                            <td className="payment-table-column desc">{payment.metadata?.description || "N/A"}</td>
                        </tr>
                        <tr>
                            <td className="payment-table-column title">Amount Paid</td>
                            <td className="payment-table-column desc">{`N${Number(payment.amountPaidNaira).toLocaleString()}`}</td>
                        </tr>
                        <tr>
                            <td className="payment-table-column title">Currency</td>
                            <td className="payment-table-column desc">{payment.currency}</td>
                        </tr>
                        <tr>
                            <td className="payment-table-column title">Date Paid</td>
                            <td className="payment-table-column desc">{getFormattedDate()}</td>
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