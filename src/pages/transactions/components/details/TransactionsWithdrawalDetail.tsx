import { DetailSkeleton } from "@/components/DetailSkeleton";
import { FileCard } from "@/components/FileCard";
import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { StatusBadge } from "@/components/StatusBadge";
import ViewCopyDetailRow from "@/components/ViewCopyDetailRow";
import { ViewDetailRow } from "@/components/ViewDetailRow";
import { EmptyRecords } from "@/pages/my-branch/components/EmptyStates";
import { useWithdrawalDetails } from "@/services/hooks/transactions";
import type { WithdrawalDetailResponse } from "@/services/types/transactions";
import { withdrawalStatusMap } from "@/utils/helpers";
import { Divider } from "@mui/material";
import { formatDate } from "date-fns";


export default function TransactionsWithdrawalDetail({ open, onClose, id }: {
    open: boolean,
    onClose: () => void,
    id: string | null
}) {
    if (!id) return null;

    const { data, isLoading, isError } = useWithdrawalDetails(id);

    return (
        <ShellModal open={open} onClose={onClose}>
            <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                <ShellHeader title="View Request" onClose={onClose} />
                <Divider className="flex shrink-0" />
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="resources-modal-body pb-6">
                        {isLoading && <DetailSkeleton />}
                        {data && <DetailContent data={data} />}
                        {(isError && !data && !isLoading) && (
                            <div className="text-aciu-abriba p-4">
                                Unable to load nominated project's details.
                                Please open the modal again.
                            </div>
                        )}
                    </div>
                    <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
                        <button className="btn btn-primary" disabled={!data}>
                                Download
                        </button>
                    </div>
                </div>
            </div>
        </ShellModal>
    )
}
const DetailContent = ({ data }: { data: WithdrawalDetailResponse }) => {
    if (!data) return <EmptyRecords />;

    const { TransactionId, Branch, RequestedBy, Position, WithdrawalSource, Amount, BankName, AccountName, AccountNumber, Date, PaymentStatus, withdrawalAgreementForm } = data;

    const rawStatus = PaymentStatus;
    const normalized = rawStatus.toLowerCase() as WithdrawalDetailResponse["PaymentStatus"];
                
    const { label, labelColor, dotColor, bgColor } =
        withdrawalStatusMap[normalized];

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
                        <ViewCopyDetailRow label="Transaction ID" content={TransactionId} ariaLabel="Copy Transaction ID"/>
                        <ViewDetailRow label="Branch" content={Branch} />
                        <ViewDetailRow label="Requested By" content={RequestedBy} />
                        <ViewDetailRow label="Position" content={Position} />
                        <ViewDetailRow label="Withdrawal Source" content={WithdrawalSource.toLocaleLowerCase()} />
                        <ViewDetailRow label="Amount" content={`₦${Math.round(Amount).toLocaleString()}`} />
                        <ViewCopyDetailRow label="Bank Name" content={BankName} ariaLabel="Copy Bank Name" />
                        <ViewCopyDetailRow label="Account Number" content={AccountNumber} ariaLabel="Copy Account Number" />
                        <ViewCopyDetailRow label="Account Name" content={AccountName} ariaLabel="Copy Account Name" />
                        <ViewDetailRow label="Date" content={formatDate(Date, "dd-MM-yyyy h:mm  aaaaa'm'")} />
                        <ViewDetailRow label="Status" content={<StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} />} />
                    </tbody>
                </table>
            </div>
            {withdrawalAgreementForm &&
                <FileCard
                    fileLabel="Withdrawal Agreement Form"
                    fileType="pdf"
                    fileUrl={withdrawalAgreementForm}
                />
            } 
        </div>
    )
}