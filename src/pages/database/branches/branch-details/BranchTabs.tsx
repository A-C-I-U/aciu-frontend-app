import type { ExtendedTabItem } from "@/utils/types";
import BranchDuesTab from "./tabs/branch-dues";
import BranchPaymentsTab from "./tabs/payments";
import WithdrawalTab from "./tabs/withdrawals";
import BranchEventsTab from "./tabs/branch-events";
import BranchMembersTab from "./tabs/branch-members";
import BranchGalleryTab from "./tabs/branch-gallery";
import BranchExecutivesTab from "./tabs/branch-leadership";


export const branchTabs: ExtendedTabItem[] = [
    {
        key: "branch-dues",
        label: "Branch Dues",
        description: "",
        contentDescription: "",
        content: <BranchDuesTab />
    },
    {
        key: "branch-leadership",
        label: "Branch Leadership",
        description: "",
        contentDescription: "",
        content: <BranchExecutivesTab />
    },
    {
        key: "payments",
        label: "Payments",
        description: "",
        contentDescription: "",
        content: <BranchPaymentsTab />
    },
    {
        key: "withdrawals",
        label: "Withdrawals",
        description: "",
        contentDescription: "",
        content: <WithdrawalTab />
    },
    {
        key: "branch-members",
        label: "Branch Members",
        description: "",
        contentDescription: "",
        content: <BranchMembersTab />
    },
    {
        key: "branch-events",
        label: "Branch Events",
        description: "",
        contentDescription: "",
        content: <BranchEventsTab />
    },
    {
        key: "branch-gallery",
        label: "Branch Gallery",
        description: "",
        contentDescription: "",
        content: <BranchGalleryTab />
    },

]