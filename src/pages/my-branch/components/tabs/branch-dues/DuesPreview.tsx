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

export default function DuesPreview({
    open, onClose, due
}: { open: boolean, onClose: () => void, due: BranchDueDataType | null}) {
    
    if (!due) return null;

    const { dueType, status, creationDate, createdBy, intervals, dueRules, startDate, endDate, amountPaid, activityLogs } = due;
    const { label, labelColor, bgColor, dotColor } = branchStatusMap[status];

    const duesPreviewTabs = [
        {
            key: "activity-logs",
            label: "Activity Logs",
            content: <ActivityLogs logs={activityLogs} />
        }, 
        {
            key: "dues-rules",
            label: "Dues Rules",
            content: <DueRules dueRules={dueRules} />
        }
    ]

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
                    <div className="resources-modal-body">
                        <div className="my-5.5 flex flex-col gap-8.5">
                            <p className="leading-5 text-xl font-medium capitalize">
                                {dueType}
                            </p>
                            <table>
                                <tbody>
                                    <div className="flex flex-col gap-4">
                                        <DetailRow 
                                            icon={<Clock size={20} color="#737373" />} 
                                            label="Created on"
                                        >
                                            {formatDate(creationDate, "dd MMMMMM, yyyy h:mm aaaa")}
                                        </DetailRow>
                                        <DetailRow 
                                            icon={<StatusLoader width={20} height={20} />}
                                            label="Status"
                                        >
                                            <StatusBadge label={label} dotColor={dotColor} bgColor={bgColor} labelColor={labelColor} />
                                        </DetailRow>
                                        <DetailRow 
                                            icon={<User size={20} color="#737373" />}
                                            label="Created By"
                                        >
                                            {createdBy}
                                        </DetailRow>
                                        <DetailRow 
                                            icon={<DollarSquare size={20} color="#737373" />}
                                            label="Amount"
                                        >
                                            {`N${(+amountPaid).toLocaleString()}`}
                                        </DetailRow>
                                        <DetailRow
                                            icon={<ReloadIcon width={20} height={20} />}
                                            label="Intervals"
                                        >
                                            <span className="capitalize">{intervals}</span>
                                        </DetailRow>
                                        <DetailRow
                                            icon={<MoreTimeIcon width={24} height={24} />}
                                            label="Start Date"
                                        >
                                            {formatDate(startDate, "dd MMMMMM, yyyy h:mm aaaa")}
                                        </DetailRow>
                                        <DetailRow
                                            icon={<TimeOutIcon width={18} height={18} />}
                                            label="End Date"
                                        >
                                            {endDate ?? "Ongoing"}
                                        </DetailRow>
                                    </div>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col my-7.5">
                            <div className="flex gap-4 justify-start w-full mx-auto px-4">
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
                    {/* Should Trigger Edit Dues */}
                    <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
                        <button className="btn btn-primary" onClick={() => {}}>
                            Edit Dues
                        </button>
                        <button className="btn btn-secondary">
                            Deactivate
                        </button>
                    </div> 
                </div>
            </div>
        </ShellModal>
    )
}


export const DetailRow = ({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode}) => {
    return (
        <tr className="grid grid-cols-[.8fr_1.5fr]">
            <td className="flex items-center gap-2">
                {icon}
                {label}
            </td>
            <td className="items-start">{children}</td>
        </tr>
    )
}