import { ScrollLock } from "@/components/ScrollLock";
import { Avatar, Dialog, Divider } from "@mui/material";
import DummyProfile from "/images/avatar.png"
import { StatusBadge } from "@/components/StatusBadge";
import { databaseMemberStatusMap } from "@/utils/helpers";
import { formatDate } from "date-fns";
import { useState } from "react";
import ProfileOverviewTab from "./ProfileOverviewTab";
import MemberPaymentTab from "./MemberPaymentTab";
import MemberActivityTab from "./MemberActivityTab";
import { X } from "lucide-react";
import { dummyBranchMember } from "@/utils/data";

const defaultDialogSx = {
    "& .MuiDialog-paper": {
        overflow: "hidden",
        width: { xs: "92%", md: "65%" },
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
    open, onClose, id
}: {
    open: boolean,
    onClose: () => void,
    id: string | null
}) {
    if (!id) return null;

    const { fullName, verifiedOn, joinedOn } = dummyBranchMember;
    const { label, bgColor, dotColor, labelColor } = databaseMemberStatusMap[verifiedOn ? 'approved' : 'pending'];
    const [activeTab, setActiveTab] = useState(branchMemberTabs[0])
    const ActiveTabComponent = activeTab.content;

    return (
        <>
            <ScrollLock open={open} />
            <Dialog open={open} onClose={onClose} sx={defaultDialogSx}>
                <button onClick={onClose} className="pt-4 flex justify-end px-3.75"><X size={24} /></button>
                <div className="pt-2.5 px-3.75 md:px-7 flex flex-col gap-6 overflow-y-auto overflow-x-hidden">
                    <div className="flex flex-col gap-4">
                        <div className="relative -mx-3.75 md:-mx-7">
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-aciu-dark-grey -translate-y-1/2" />

                            <div className="relative z-10 px-3.75 md:px-7">
                                <Avatar
                                    src={DummyProfile}
                                    className="rounded-[4.8rem] w-21.25! h-21.25!"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-aciu-border-grey">
                                    {fullName}
                                </p>
                                <StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} />
                            </div>
                            <div className="hidden md:grid grid-cols-3 gap-8 items-center max-w-fit">
                                <div className="flex items-center gap-8">
                                    <MemberField title="Joined on" content={formatDate(joinedOn, "dd-MM-yyyy h:mm  aaaaa'm'")} />
                                    <span className="h-7 w-px bg-aciu-dark-grey" />
                                </div>
                                <div className="flex items-center gap-8">
                                    <MemberField title="Verified on" content="Nov 12, 2025" />
                                    <span className="h-7 w-px bg-aciu-dark-grey" />
                                </div>
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
                        <div className="mt-6 overflow-y-auto overflow-x-hidden h-full">
                            <ActiveTabComponent branchMember={dummyBranchMember} />
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
        <div className="flex flex-col gap-2 text-sm max-w-fit">
            <p className="text-aciu-grey">
                {title}
            </p>
            <p className="text-aciu-border-grey font-medium">
                {content}
            </p>
        </div>
    )
}