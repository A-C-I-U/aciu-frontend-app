import { MoreTimeIcon, ReloadIcon, StatusLoader, TimeOutIcon } from "@/components/Icons";
import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { StatusBadge } from "@/components/StatusBadge";
import { branchStatusMap } from "@/utils/helpers";
import type { BranchDueDataType } from "@/utils/types";
import { Divider } from "@mui/material";
import { formatDate } from "date-fns";
import { Clock, DollarSquare, User } from "iconsax-react";
import { useState } from "react";
import DueRules from "./DueRules";
import ActivityLogs from "./ActivityLogs";
import { useDuesDetails } from "@/services/hooks/dues";
import { DetailSkeleton } from "@/components/DetailSkeleton";


export default function DuesPreview({
    open, onClose, id
}: { open: boolean, onClose: () => void, id: string | null}) {
    
    if (!id) return null;

    const { data: due, isLoading, isError } = useDuesDetails(id);

    const duesPreviewTabs = [
        {
            key: "activity-logs",
            label: "Activity Logs",
            content: <ActivityLogs id={id} />
        }, 
        {
            key: "dues-rules",
            label: "Dues Rules",
            content: <DueRules id={id}/>
        }
    ]

    const dueOffset = due ? {
        dueType: due?.title,
        status: due?.status,
        startDate: due?.startDate,
        endDate: due?.endDate,
        createdBy: due?.User.fullName,
        createdAt: due?.createdAt,
        createdOn: due?.createdOn,
        intervals: due?.interval,
        amount: due?.amount,
    } : null;

    


    const [activeTab, setActiveTab] = useState(duesPreviewTabs[0]);




    return (
        <ShellModal
            open={open}
            onClose={onClose}
        >
            <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                <ShellHeader title="Dues Preview" onClose={onClose} />
                <Divider className="flex shrink-0" />
                <div className="flex flex-col h-full overflow-hidden">
                    {isLoading && <div className="mx-5"><DetailSkeleton /></div>}
                    {(isError && !dueOffset && !isLoading) && (
                        <div className="text-aciu-abriba p-4">
                            Unable to load due's details.
                            Please open the modal again.
                        </div>
                    )}
                    {dueOffset && 
                        <div className="resources-modal-body">
                            <div className="flex flex-col gap-8.5">
                                <p className="leading-5 text-base lg:text-xl font-medium capitalize">
                                    {dueOffset.dueType}
                                </p>
                                <table>
                                    <tbody className="flex flex-col gap-5">
                                        <DetailRow 
                                            icon={<Clock size={20} color="#737373" />} 
                                            label="Created on"
                                        >
                                            {formatDate(dueOffset.createdOn, "dd MMMMMM, yyyy h:mm a")}
                                        </DetailRow>
                                        <DetailRow 
                                            icon={<StatusLoader width={20} height={20} />}
                                            label="Status"
                                        >
                                            {(() => {
                                                if (!dueOffset.status) return <span>-</span>;

                                                const { label, labelColor, bgColor, dotColor } =
                                                    branchStatusMap[dueOffset.status.toLowerCase() as BranchDueDataType["status"]];

                                                return (
                                                    <div className="max-h-fit">
                                                    <StatusBadge
                                                        label={label}
                                                        dotColor={dotColor}
                                                        bgColor={bgColor}
                                                        labelColor={labelColor}
                                                    />
                                                    </div>
                                                );
                                                })()}
                                        </DetailRow>
                                        <DetailRow 
                                            icon={<User size={20} color="#737373" />}
                                            label="Created By"
                                        >
                                            {dueOffset?.createdBy}
                                        </DetailRow>
                                        <DetailRow 
                                            icon={<DollarSquare size={20} color="#737373" />}
                                            label="Amount"
                                        >
                                            {`₦${(+dueOffset.amount).toLocaleString()}`}
                                        </DetailRow>
                                        <DetailRow
                                            icon={<ReloadIcon width={20} height={20} />}
                                            label="Intervals"
                                        >
                                            <span className="capitalize">{dueOffset.intervals}</span>
                                        </DetailRow>
                                        <DetailRow
                                            icon={<MoreTimeIcon width={20} height={20} />}
                                            label="Start Date"
                                        >
                                            {formatDate(dueOffset.startDate, "dd MMMMMM, yyyy h:mm a")}
                                        </DetailRow>
                                        <DetailRow
                                            icon={<TimeOutIcon width={16} height={16} />}
                                            label="End Date"
                                        >
                                            {formatDate(dueOffset.endDate, "dd MMMMMM, yyyy h:mm a") || "Ongoing"}
                                        </DetailRow>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-col my-7.5">
                                <div className="flex gap-4 justify-start w-full mx-auto">
                                    {duesPreviewTabs.map((tab) => (
                                        <button
                                            key={tab.key}
                                            onClick={() => setActiveTab(tab)}
                                            className={`${
                                                activeTab?.key === tab.key
                                                ? "text-aciu-red font-semibold"
                                                : "text-aciu-abriba font-medium pb-4"
                                            } text-xs md:text-sm font-montserrat flex flex-col gap-2`}
                                        >
                                            {tab.label}
                                            {activeTab?.key === tab.key && (
                                                <span className="block w-full h-0.5 bg-aciu-red mt-2 rounded-full"></span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <Divider orientation="horizontal" className="text-aciu-dark-grey" flexItem />
                                <div className="mt-6">
                                    {activeTab.content}
                                </div>
                            </div>
                        </div>
                    }
                    {/* Should Trigger Edit Dues */}
                    
                </div>
                <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
                    <button className="btn btn-primary" disabled={!dueOffset} onClick={() => {}}>
                        Edit Dues
                    </button>
                    <button className="btn btn-secondary" disabled={!dueOffset}>
                        Deactivate
                    </button>
                </div> 
            </div>
        </ShellModal>
    )
}


export const DetailRow = ({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode}) => {
    return (
        <tr className="grid grid-cols-[.8fr_1.5fr] items-center">
            <td className="flex items-center gap-2 text-xs md:text-sm">
                {icon}
                {label}
            </td>
            <td className="items-start text-xs md:text-sm">{children}</td>
        </tr>
    )
}