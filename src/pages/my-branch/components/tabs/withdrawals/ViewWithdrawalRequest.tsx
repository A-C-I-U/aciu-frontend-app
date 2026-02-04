import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { StatusBadge } from "@/components/StatusBadge";
import { useWithdrawalDetails } from "@/services/hooks/branch";
import { withdrawalStatusMap } from "@/utils/helpers";
import type { WithdrawalDataType } from "@/utils/types";
import { Divider, Skeleton } from "@mui/material";
import { format } from "date-fns";

export default function ViewWithdrawalRequest({ open, onClose, withdrawal }: {
    open: boolean,
    onClose: () => void,
    withdrawal: WithdrawalDataType | null
}) {
    const { data: details, isLoading } = useWithdrawalDetails(withdrawal?.id);

    // Safeguard status mapping
    const normalizedStatus = details?.PaymentStatus ? details.PaymentStatus.toLowerCase() : "";
    const statusConfig = (withdrawalStatusMap as any)[normalizedStatus] || {
        label: details?.PaymentStatus || "Unknown",
        labelColor: "#667085",
        dotColor: "#667085",
        bgColor: "#F2F4F7"
    };

    const { label, labelColor, dotColor, bgColor } = statusConfig;

    const getFormattedDate = (dateString?: string) => {
        if (!dateString) return "N/A";
        try {
            return format(new Date(dateString), "dd-MM-yyyy h:mm aaaaa'm'");
        } catch {
            return "N/A";
        }
    }

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
                        {isLoading ? (
                            <div className="flex flex-col gap-4 p-4">
                                <Skeleton variant="rectangular" height={40} />
                                <Skeleton variant="rectangular" height={40} />
                                <Skeleton variant="rectangular" height={40} />
                                <Skeleton variant="rectangular" height={40} />
                            </div>
                        ) : details ? (
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
                                        <td className="payment-table-column desc">{details.TransactionId || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td className="payment-table-column title">Requested By</td>
                                        <td className="payment-table-column desc">{details.RequestedBy || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td className="payment-table-column title">Position</td>
                                        <td className="payment-table-column desc">{details.Position || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td className="payment-table-column title">Bank Name</td>
                                        <td className="payment-table-column desc">{details.BankName || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td className="payment-table-column title">Account Number</td>
                                        <td className="payment-table-column desc">{details.AccountNumber || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td className="payment-table-column title">Account Name</td>
                                        <td className="payment-table-column desc">{details.AccountName || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td className="payment-table-column title">Source</td>
                                        <td className="payment-table-column desc">{details.WithdrawalSource || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td className="payment-table-column title">Amount</td>
                                        <td className="payment-table-column desc">{`N${Number(details.Amount || 0).toLocaleString()}`}</td>
                                    </tr>
                                    <tr>
                                        <td className="payment-table-column title">Date</td>
                                        <td className="payment-table-column desc">{getFormattedDate(details.Date)}</td>
                                    </tr>
                                    <tr>
                                        <td className="payment-table-column title">Status</td>
                                        <td className="payment-table-column desc">
                                            <StatusBadge
                                                label={label}
                                                labelColor={labelColor}
                                                bgColor={bgColor}
                                                dotColor={dotColor}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No details available.
                            </div>
                        )}
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