import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { StatusBadge } from "@/components/StatusBadge";
import { useWithdrawalDetail } from "@/services/hooks/dashboard";
import type { WithdrawalResponse } from "@/services/types/dashboad";
import { withdrawalStatusMap } from "@/utils/helpers";
import type { WithdrawalDataType } from "@/utils/types";
import { Divider } from "@mui/material";
import { formatDate } from "date-fns";
import type React from "react";

export default function WithdrawalDetail({ open, onClose, withdrawalId }: {
    open: boolean,
    onClose: () => void,
    withdrawalId: string | null }
) {
    if (!withdrawalId) return null;

    const { data, isLoading } = useWithdrawalDetail(withdrawalId)

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
                       {isLoading ?
                            <DetailSkeleton /> :
                            <WithdrawalDetailContent data={data.data} />
                        }
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

export const ViewDetailRow = ({ label, content }: { label: string, content: React.ReactNode }) => {
    return (
        <tr>
            <td className="payment-table-column title whitespace-nowrap">{label}</td>
            <td className="payment-table-column desc capitalize whitespace-nowrap max-w-60 truncate">{content}</td>
        </tr>
    )
}


const WithdrawalDetailContent = ({ data }: { data: WithdrawalResponse }) => {
    
    const withdrawalDetail = {
        id: data.id,
        transactionId: data.TransactionID,
        paymentType: data["Payment Type"].toLowerCase(),
        date: data.Date,
        amount: data.Amount,
        status: data.Status.toLowerCase(),
        submittedBy: data["Submitted By"],
        branchName: data["Branch Name"]
    };

    const { label, labelColor, dotColor, bgColor } = withdrawalStatusMap[withdrawalDetail.status as WithdrawalDataType["status"]]

    return (
        <table>
            <thead>
                <tr className="text-left">
                    <th className="payment-table-column title">Title</th>
                    <th className="payment-table-column desc">Description</th>
                </tr>
            </thead>
            <tbody>
                <ViewDetailRow label="Transaction ID" content={withdrawalDetail.transactionId} />
                <ViewDetailRow label="Submitted By" content={withdrawalDetail.submittedBy} />
                <ViewDetailRow label="Payment Type" content={withdrawalDetail.paymentType} />
                <ViewDetailRow label="Amount" content={`N${withdrawalDetail.amount.toLocaleString()}`} />
                <ViewDetailRow label="Date Paid" content={formatDate(withdrawalDetail.date, "dd-MM-yyyy h:mm  aaaaa'm'")} />
                <ViewDetailRow label="Branch Name" content={withdrawalDetail.branchName} />
                <ViewDetailRow label="Payment Status" content={<StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} />} />
            </tbody>
    </table>
    )
}

const DetailSkeleton = () => {
    return (
        <table>
            <thead>
                <tr className="payment-table-column title">
                    <th className="h-4 bg-gray-200 rounded w-full mb-2">{""}</th>
                    <th className="h-4 bg-gray-200 rounded w-full mb-2">{""}</th>
                </tr>
            </thead>
            <tbody>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <tr key={item}>
                        <td className="payment-table-column title">
                            <span className="inline-block h-2 bg-gray-200 rounded w-full mb-2"></span>
                        </td>
                        <td className="payment-table-column desc capitalize">
                            <span className="inline-block h-2 bg-gray-200 rounded w-full mb-2"></span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}