import { ScrollLock } from "@/components/ScrollLock";
import type { BranchMemberDataType } from "@/utils/types";
import { Avatar, Dialog, Divider, Skeleton } from "@mui/material";
import DummyProfile from "/images/avatar.png"
import { StatusBadge } from "@/components/StatusBadge";
import { branchMemberStatusMap } from "@/utils/helpers";
import { formatDate } from "date-fns";
import React, { useState } from "react";
import ProfileOverviewTab from "./ProfileOverviewTab";
import MemberPaymentTab from "./MemberPaymentTab";
import MemberActivityTab from "./MemberActivityTab";
import { X } from "lucide-react";
import { useMemberOverview } from "@/services/hooks/branch";
import { useVerifyMember, useRejectMember } from "@/services/mutations/members";
import { enqueueSnackbar } from "notistack";

const defaultDialogSx = {
    "& .MuiDialog-paper": {
        overflow: "hidden",
        width: { xs: "92%", md: "90dvh" },
        margin: "0 auto",
        maxWidth: "none",
        borderRadius: "1.25rem",
        height: "none",
        maxHeight: "90dvh",
        display: "flex",
        flexDirection: "column",
    }
};

const branchMemberTabs = [
    {
        key: "profile-overview",
        label: "Profile Overview",
        content: ProfileOverviewTab
    },
    {
        key: "payments",
        label: "Payments",
        content: MemberPaymentTab
    },
    {
        key: "member-activity",
        label: "Member Activity",
        content: MemberActivityTab
    }
]

export default function ViewBranchMember({
    open, onClose, branchMember
}: {
    open: boolean,
    onClose: () => void,
    branchMember: BranchMemberDataType | null
}) {
    if (!branchMember) return null;

    const { fullName, verificationStatus, id } = branchMember;
    const { label, bgColor, dotColor, labelColor } = branchMemberStatusMap[verificationStatus];
    const [activeTab, setActiveTab] = useState(branchMemberTabs[0]);
    const ActiveTabComponent = activeTab.content;

    const { data: overview, isLoading: isOverviewLoading } = useMemberOverview(id);
    const { mutate: verifyMember, isPending: isVerifying } = useVerifyMember();
    const { mutate: rejectMember, isPending: isRejecting } = useRejectMember();

    const [isRejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    const handleVerify = () => {
        verifyMember(id, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    const handleReject = () => {
        if (!rejectionReason.trim()) {
            enqueueSnackbar("Please provide a reason for rejection", { variant: "warning" });
            return;
        }
        rejectMember({ userId: id, reason: rejectionReason }, {
            onSuccess: () => {
                setRejectModalOpen(false);
                onClose();
            }
        });
    };


    return (
        <>
            <ScrollLock open={open} />
            <Dialog open={open} onClose={onClose} sx={defaultDialogSx}>
                <button onClick={onClose} className="pt-4 flex justify-end px-3.75"><X size={24} /></button>
                <div className="pt-15 px-3.75 md:px-7 flex flex-col gap-4 overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        <Avatar src={DummyProfile} className="rounded-[4.8rem] w-21.25! h-21.25!" />
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-aciu-border-grey">
                                    {fullName}
                                </p>
                                <StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} />
                            </div>
                            <div className="hidden md:grid grid-cols-3 gap-8 items-center max-w-fit">
                                <div className="flex items-center gap-8">
                                    <MemberField title="Joined on" content={isOverviewLoading ? <Skeleton width={92} height={21} sx={{ borderRadius: "2rem" }}/> : formatDate(overview?.joinedOn ?? "", "MMMM dd yyyy")} />
                                    <span className="h-7 w-px bg-aciu-dark-grey" />
                                </div>
                                <div className="flex items-center gap-8">
                                    <MemberField title="Verified on" content={isOverviewLoading ? <Skeleton width={92} height={21} sx={{ borderRadius: "2rem" }}/> : overview?.verifiedOn} />
                                    <span className="h-7 w-px bg-aciu-dark-grey" />
                                </div>
                                <MemberField title="Verified by" content={isOverviewLoading ? <Skeleton width={92} height={21} sx={{ borderRadius: "2rem" }}/> : overview?.verifiedBy} />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        {activeTab.key === "payments" ?
                            <>
                                <button className="btn btn-primary max-w-fit">
                                    Download Member Record
                                </button>
                                <button className="btn btn-danger max-w-fit">
                                    Withdraw Verification
                                </button>
                            </>
                            :
                            <>
                                <button
                                    className="btn btn-primary max-w-fit"
                                    onClick={handleVerify}
                                    disabled={isVerifying || isRejecting || verificationStatus === "verified"}
                                >
                                    {isVerifying ? "Verifying..." : "Verify & Approve"}
                                </button>
                                <button
                                    className="btn btn-danger max-w-fit"
                                    onClick={() => setRejectModalOpen(true)}
                                    disabled={isVerifying || isRejecting}
                                >
                                    {isRejecting ? "Rejecting..." : "Reject Member"}
                                </button>
                            </>
                        }

                    </div>

                    <div className="flex flex-col mb-7.5">
                        <div className="flex gap-4 md:gap-8 justify-start w-full mx-auto">
                            {branchMemberTabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab)}
                                    className={`${activeTab?.key === tab.key
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
                        <div className="mt-6 overflow-y-auto h-full">
                            <ActiveTabComponent branchMember={branchMember} />
                        </div>
                    </div>
                </div>
                <Dialog
                    open={isRejectModalOpen}
                    onClose={() => setRejectModalOpen(false)}
                    sx={{
                        "& .MuiDialog-paper": {
                            borderRadius: "1.25rem",
                            padding: "2rem",
                            width: "100%",
                            maxWidth: "400px"
                        }
                    }}
                >
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold text-aciu-border-grey">Reject Member</h3>
                        <p className="text-sm text-aciu-grey">Please provide a reason for rejecting this member's verification.</p>
                        <textarea
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-aciu-red min-h-25 text-sm"
                            placeholder="Enter rejection reason..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />
                        <div className="flex gap-3 justify-end mt-2">
                            <button
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
                                onClick={() => setRejectModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-aciu-red text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                                onClick={handleReject}
                                disabled={isRejecting || !rejectionReason.trim()}
                            >
                                {isRejecting ? "Rejecting..." : "Confirm Reject"}
                            </button>
                        </div>
                    </div>
                </Dialog>
            </Dialog>
        </>
    )
}

export const MemberField = ({ title, content }: {
    title: string,
    content: React.ReactNode
}) => {
    return (
        <div className="flex flex-col gap-2 text-sm">
            <p className="text-aciu-grey">
                {title}
            </p>
            <p className="text-aciu-border-grey font-medium">
                {content}
            </p>
        </div>
    )
}