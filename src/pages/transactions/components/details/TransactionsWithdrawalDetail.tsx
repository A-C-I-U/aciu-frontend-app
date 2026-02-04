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
import { CircularProgress, Divider } from "@mui/material";
import { formatDate } from "date-fns";
import RejectRequest from "../actions/RejectRequest";
import { useUpdateWithdrawalRequestStatus } from "@/services/mutations/transactions";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";


export default function TransactionsWithdrawalDetail({ open, onClose, id }: {
    open: boolean,
    onClose: () => void,
    id: string | null
}) {
    if (!id) return null;

    const { data, isLoading, isError } = useWithdrawalDetails(id);
    const { mutateAsync: updateStatus, isPending } = useUpdateWithdrawalRequestStatus();
    const [openReject, setOpenReject] = useState(false);

    const withdrawal = data ? {
        transactionId: data.TransactionId,
        branch: data.Branch,
        requestedBy: data.RequestedBy,
        position: data.Position,
        withdrawalSource: data.WithdrawalSource,
        amount: data.Amount,
        bankName: data.BankName,
        accountNumber: data.AccountNumber,
        accountName: data.AccountName,
        date: data.Date,
        status: data.PaymentStatus,
        ...data
    }: null;

    const handleApprove = async (id: string) => {
        await updateStatus({
            id,
            payload: { status: "APPROVED" }
        })
    }

    const handleSubmit = async (id: string) => {
        try {
            await handleApprove(id)
            enqueueSnackbar('Withdrawal Request Approved', {
                variant: 'success',
                autoHideDuration: 2000
            })
            onClose();
        } catch (err) {
            enqueueSnackbar('Failed to approve Withdrawal Request', { variant: 'error' })
        }
    }

    return (
        <>
            <ShellModal open={open} onClose={onClose}>
                <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                    <ShellHeader title="View Request" onClose={onClose} />
                    <Divider className="flex shrink-0" />
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="resources-modal-body pb-6">
                            {isLoading && <DetailSkeleton />}
                            {withdrawal && <DetailContent data={withdrawal} />}
                            {(isError && !withdrawal && !isLoading) && (
                                <div className="text-aciu-abriba p-4">
                                    Unable to load nominated project's details.
                                    Please open the modal again.
                                </div>
                            )}
                        </div>
                        <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
                            <button className="btn btn-primary" disabled={!data}
                                onClick={() => handleSubmit(id)}>
                                    {isPending && <CircularProgress sx={{ color: "white" }} size={12} />}
                                Mark as Completed
                            </button>
                            <button className="btn btn-danger tracking-[5%]" disabled={!data} onClick={() => { setOpenReject(true); onClose()}}>
                                Reject Request
                            </button>
                        </div>
                    </div>
                </div>
            </ShellModal>
            <RejectRequest
                open={openReject}
                onClose={() => setOpenReject(false)}
                id={id}
            />
        </>
    )
}
const DetailContent = ({ data }: { data: WithdrawalDetailResponse }) => {
    if (!data) return <EmptyRecords />;

    const { transactionId, branch, requestedBy, position, withdrawalSource, amount, bankName, accountName, accountNumber, date, status, withdrawalAgreementForm } = data;

    const rawStatus = status;
    const normalized = rawStatus.toLowerCase() as WithdrawalDetailResponse["status"];
                
    const { label, labelColor, dotColor, bgColor } =
        withdrawalStatusMap[normalized];

    return (
        <>
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
                            <ViewCopyDetailRow label="Transaction ID" content={transactionId} ariaLabel="Copy Transaction ID"/>
                            <ViewDetailRow label="branch" content={branch} />
                            <ViewDetailRow label="Requested By" content={requestedBy} />
                            <ViewDetailRow label="position" content={position} />
                            <ViewDetailRow label="Withdrawal Source" content={withdrawalSource.toLocaleLowerCase()} />
                            <ViewDetailRow label="amount" content={`₦${Math.round(amount).toLocaleString()}`} />
                            <ViewCopyDetailRow label="Bank Name" content={bankName} ariaLabel="Copy Bank Name" />
                            <ViewCopyDetailRow label="Account Number" content={accountNumber} ariaLabel="Copy Account Number" />
                            <ViewCopyDetailRow label="Account Name" content={accountName} ariaLabel="Copy Account Name" />
                            <ViewDetailRow label="date" content={formatDate(date, "dd-MM-yyyy h:mm  aaaaa'm'")} />
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
        </>
    )
}