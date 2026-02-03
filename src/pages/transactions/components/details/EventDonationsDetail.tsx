import { DetailSkeleton } from "@/components/DetailSkeleton";
import ReceiptDownloadButton from "@/components/ReceiptDownloadButton";
import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { StatusBadge } from "@/components/StatusBadge";
import { ViewDetailRow } from "@/components/ViewDetailRow";
import { EmptyRecords } from "@/components/EmptyStates";
import { useEventDonationDetails } from "@/services/hooks/transactions";
import type { DonationsResponse } from "@/services/types/transactions";
import { paymentStatusMap } from "@/utils/helpers";
import { Divider } from "@mui/material";
import { formatDate } from "date-fns";

export default function EventDonationsDetail ({
    open, onClose, id
}: { open: boolean, onClose: () => void, id: string | null }) {
    
    if (!id) return null;
    const { data, isLoading, isError } = useEventDonationDetails(id);

        
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
                                    Unable to load details.
                                    Please open the modal again.
                                </div>
                            )}
                            {(!data && !isLoading) && <EmptyRecords />}
                            {data &&
                                (<>
                                {(() => {
                                    const { label, labelColor, dotColor, bgColor } = paymentStatusMap[data.status as DonationsResponse["Status"]]
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
                                                    <ViewDetailRow label="Event Name" content={data.eventName ?? "null"} />
                                                    <ViewDetailRow label="Event Category" content={data.eventCategory ?? "null"} />
                                                    <ViewDetailRow label="Donor Name" content={data.donorName} />
                                                    <ViewDetailRow label="Donor's Branch" content={data.donorBranch} />
                                                    <ViewDetailRow label="Amount" content={`N${Math.round(data.amount).toLocaleString()}`} />
                                                    <ViewDetailRow label="Source" content={data.source} />
                                                    <ViewDetailRow label="Date Paid" content={formatDate(data.date, "dd-MM-yyyy h:mm  a")} />
                                                    <ViewDetailRow label="Payment Status" content={<StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} />} />
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>)
                                })()}
                                </>
                            )}
                        </div>
                        <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
                            <ReceiptDownloadButton data={data} type="eventDonation" />
                        </div>
                    </div>
                </div>
            </ShellModal>
        </>

    )
}