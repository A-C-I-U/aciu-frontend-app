import { ScrollLock } from "@/components/ScrollLock";
import type { BranchMemberDataType } from "@/utils/types";
import { Avatar, Dialog, Divider } from "@mui/material";
import DummyProfile from "/images/avatar.png"
import { StatusBadge } from "@/components/StatusBadge";
import { branchMemberStatusMap } from "@/utils/helpers";
import { formatDate } from "date-fns";
import { useState } from "react";
import ProfileOverviewTab from "./ProfileOverviewTab";
import MemberPaymentTab from "./MemberPaymentTab";
import MemberActivityTab from "./MemberActivityTab";
import { X } from "lucide-react";

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

// Pass id instead of branch member

export default function ViewBranchMember({
    open, onClose, branchMember
}: { 
    open: boolean,
    onClose: () => void,
    branchMember: BranchMemberDataType | null
}) {
    if (!branchMember) return null;

    const { fullName, verificationStatus, joinedOn } = branchMember;
    const { label, bgColor, dotColor, labelColor } = branchMemberStatusMap[verificationStatus];
    const [activeTab, setActiveTab] = useState(branchMemberTabs[0])
    const ActiveTabComponent = activeTab.content;

    return (
        <>
            <ScrollLock open={open} />
            <Dialog open={open} onClose={onClose} sx={defaultDialogSx}>
                <button onClick={onClose}><X size={24} /></button>
                <div className="pt-15 px-3.75 md:px-7 flex flex-col gap-4 overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        <Avatar src={DummyProfile} className="rounded-[4.8rem] !w-21.25 !h-21.25"/>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-aciu-border-grey">
                                    {fullName}
                                </p>
                                <StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} /> 
                            </div>
                            <div className="hidden md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8 items-center">
                                <MemberField title="Joined on" content={formatDate(joinedOn, "dd-MM-yyyy h:mm  aaaaa'm'")} />
                                <Divider orientation="vertical" className="h-7" />
                                <MemberField title="Veirfied on" content="Nov 12, 2025" />
                                <Divider orientation="vertical" className="h-7" />
                                <MemberField title="Verified by" content="Ngozi Umeh (Admin)" />
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
                                <button className="btn btn-primary max-w-fit">
                                    Verify & Approve
                                </button>
                                <button className="btn btn-danger max-w-fit">
                                    Reject Member
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
                        <div className="mt-6 overflow-y-auto h-full">
                            <ActiveTabComponent branchMember={branchMember} />
                        </div>
                    </div>
                </div>
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