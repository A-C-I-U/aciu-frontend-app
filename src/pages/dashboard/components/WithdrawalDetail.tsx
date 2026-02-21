import { DetailSkeleton } from "@/components/DetailSkeleton";
import ReceiptDownloadButton from "@/components/ReceiptDownloadButton";
import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { StatusBadge } from "@/components/StatusBadge";
import { ViewDetailRow } from "@/components/ViewDetailRow";
import { EmptyRecords } from "@/components/EmptyStates";
import { useNationalDashboardWithdrawalDetail } from "@/services/hooks/dashboard";
import type { DashboardWithdrawalApiResponse } from "@/services/types/dashboad";
import { withdrawalStatusMap } from "@/utils/helpers";
import type { WithdrawalDataType } from "@/utils/types";
import { Divider } from "@mui/material";
import { formatDate } from "date-fns";

export default function WithdrawalDetail({ open, onClose, withdrawalId }: {
    open: boolean,
    onClose: () => void,
    withdrawalId: string | null }
) {
    if (!withdrawalId) return null;

    const { data, isLoading } = useNationalDashboardWithdrawalDetail(withdrawalId);

    const withdrawalRequest = data ? {
        ...data,
        transactionId: data.TransactionID,
        paymentType: data["Payment Type"].toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
        date: data.Date,
        amount: data.Amount,
        status: data.Status.toLowerCase(),
        submittedBy: data["Submitted By"],
        branchName: data["Branch Name"]
    } : null;

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
                    {isLoading && <DetailSkeleton />}
                    {!isLoading && data && (
                        <WithdrawalDetailContent data={data} />
                    )}
                    {!isLoading && !data && (
                        <div className="text-aciu-abriba p-4">
                            Unable to load withdrawal details.
                            Please open the modal again.
                        </div>
                    )}
                    </div>
                    <ReceiptDownloadButton data={withdrawalRequest} type="withdrawalRequest" />
                </div>
            </div>
        </ShellModal>
    )
}

const WithdrawalDetailContent = ({ data }: { data: DashboardWithdrawalApiResponse }) => {
    if (!data) return <EmptyRecords />
    
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
        <table className="table-auto border-collapse">
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