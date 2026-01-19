import { DetailSkeleton } from "@/components/DetailSkeleton";
import ShellHeader from "@/components/ShellHeader"
import ShellModal from "@/components/ShellModal"
import { StatusBadge } from "@/components/StatusBadge";
import { ViewDetailRow } from "@/components/ViewDetailRow";
import { EmptyRecords } from "@/pages/my-branch/components/EmptyStates";
import { useDuesPaymentDetails } from "@/services/hooks/transactions";
import type { DuesPaymentDetail, DuesPaymentResponse } from "@/services/types/transactions";
import { duePaymentStatusMap } from "@/utils/helpers";
import { Divider } from "@mui/material"
import { formatDate } from "date-fns";

export default function DuesPaymentDetail({ open, onClose, id }: {
    open: boolean,
    onClose: () => void,
    id: string | null
}) {
    if (!id) return null;
    const { data, isLoading, isError } = useDuesPaymentDetails(id);

    return (
        <>
            <ShellModal open={open} onClose={onClose}>
                <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                    <ShellHeader title="View Payment" onClose={onClose} />
                    <Divider className="flex shrink-0" />
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="resources-modal-body pb-6">
                            {isLoading && <DetailSkeleton />}
                            {(isError && !data && !isLoading) && (
                                <div className="text-aciu-abriba p-4">
                                    Unable to load due payment's details.
                                    Please open the modal again.
                                </div>
                            )}
                            {data && (
                                <DuesPaymentDetailContent data={data} />
                            )}
                        </div>
                        <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
                            <button disabled={!data} className="btn btn-primary">
                                Download Receipt
                            </button>
                        </div>
                    </div>
                </div>
            </ShellModal>
        </>
    )
}


const DuesPaymentDetailContent = ({ data }: { data: DuesPaymentDetail }) => {
    if (!data) return <EmptyRecords />;
    const { label, labelColor, dotColor, bgColor } = duePaymentStatusMap[data.paymentStatus as DuesPaymentResponse["status"]];

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
                    <ViewDetailRow label="Transaction ID" content={data.transactionId} />
                    <ViewDetailRow label="Paid By" content={data.paidBy} />
                    <ViewDetailRow label="Payer's Branch" content={data.payerBranch} />
                    <ViewDetailRow label="Dues Title" content={data.duesTitle} />
                    <ViewDetailRow label="Amount" content={`₦${Math.round(data.amount).toLocaleString()}`} />
                    <ViewDetailRow label="Source" content={data.source.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())} />
                    <ViewDetailRow label="Date Paid" content={formatDate(data.datePaid, "dd-MM-yyyy h:mm  a")} />
                    <ViewDetailRow label="Payment Status" content={<StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} />} />
                </tbody>
            </table>
            </div>
        </div>
    )
}