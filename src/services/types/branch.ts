export interface BranchDashboardMetrics {
    totalVerifiedMembers: number;
    activeAgeGrades: number;
    pendingVerifications: number;
    totalWithdrawals: number;
    totalDuesCollected: number;
}

export type BranchDashboardResponse = BranchDashboardMetrics;

export interface BranchOverview {
    branchLogo: string | null;
    branchName: string;
    meetingLocation: string;
    branchChairman: string;
    chairmanEmail: string;
    createdOn: string;
}

export type BranchOverviewResponse = BranchOverview;

export interface BranchDue {
    id: string;
    date: string;
    dueType: string;
    intervals: string;
    amount: number;
    status: string;
}

export type BranchDuesResponse = BranchDue[];

export interface BranchExecutive {
    profilePhoto: string | null;
    fullName: string;
    role: string;
    occupation: string;
    email: string;
    phone: string;
}

export interface BranchExecutivesResponse {
    executives: BranchExecutive[];
}

export interface BranchPayment {
    id: string;
    transactionId: string;
    amountPaidNaira: number;
    status: string;
    user: {
        fullName: string;
    };
}

export interface PaymentDetails {
    id: string;
    transactionId: string;
    stripeId: string;
    date: string;
    paymentFor: string;
    dueId: string | null;
    donationTargetType: string | null;
    donationTargetId: string | null;
    eventId: string | null;
    amountPaid: number;
    currency: string;
    amountPaidUsd: number;
    amountPaidNaira: number;
    status: string;
    userId: string;
    metadata: {
        currency: string;
        description: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface BranchWithdrawal {
    id: string;
    transactionId: string;
    Date: string;
    amount: number;
    status: string;
    User: {
        "Submitted By": string;
    };
}

export type BranchWithdrawalResponse = BranchWithdrawal[];


export interface WithdrawalDetailsResponse {
    TransactionId: string;
    Branch: string;
    RequestedBy: string;
    Position: string;
    WithdrawalSource: string;
    Amount: number;
    BankName: string;
    AccountNumber: string;
    AccountName: string;
    Date: string;
    PaymentStatus: string;
    withdrawalAgreementForm: string | null;
}

export interface SubmitWithdrawalRequest {
    withdrawalSource: string;
    amount: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    requestReason: string;
    customReason: string;
    document?: File | null;
}

export interface SubmitWithdrawalResponse {
    message: string;
    newRequest: {
        createdAt: string;
        updatedAt: string;
        id: string;
        status: string;
        userId: string;
        branchId: string;
        withdrawalSource: string;
        amount: number;
        bankName: string;
        accountName: string;
        accountNumber: string;
        requestReason: string;
        customReason: string;
        documentUrl: string | null;
        transactionId: string;
    };
}

export interface BranchMember {
    id: string;
    fullName: string;
    ageGrade: string;
    joinedOn: string;
    occupation: string;
    verificationStatus: boolean;
}

export type BranchMembersResponse = BranchMember[];

export interface MemberOverview {
    fullName: string;
    phone: string;
    email: string;
    ageGrade: string;
    village: string;
    occupation: string;
    gender: string;
    branch: string | null;
    joinedOn: string;
    verifiedOn: string | null;
    verifiedBy: string | null;
    events: string;
    projects: string;
}

export interface VerifyMemberResponse {
    message: string;
    user: {
        id: string;
        branchId: string;
        profilePhoto: string | null;
        fullName: string;
        email: string;
        phone: string;
        role: string;
        isVerified: boolean;
        branch: string;
        branchLocation: string;
        nin: string | null;
        gender: string;
        village: string;
        ageGrade: string;
        occupation: string;
        status: string;
        verifiedOn: string | null;
        verifiedBy: string | null;
        verificationNote: string | null;
        createdAt: string;
        updatedAt: string;
    };
}

export interface MemberActivityResponse {
    message: string;
    logs: string[];
}

export interface MemberPayment {
    date: string;
    title: string;
    interval: string;
    amountPaid: number;
    status: string;
}
export type MemberPaymentsResponse = MemberPayment[];

export interface SearchMember {
    id: string;
    fullName: string;
    email: string;
    phone: string;
}

export interface PermissionPayload {
    type: string;
    allowed: boolean;
}

export interface AssignExecutivePayload {
    userId: string;
    role?: string;
    customRole?: string;
    startDate: string;
    endDate: string;
    permissions: PermissionPayload[];
}

export interface AssignExecutiveResponse {
    message: string;
    executive: {
        id: string;
        branchId: string;
        userId: string;
        role: string | null;
        customRole: string;
        assignedById: string;
        assignedOn: string;
        startDate: string;
        endDate: string;
        createdAt: string;
        updatedAt: string;
    };
}

export type DuesInterval = "One time" | "Monthly" | "Quarterly" | "Yearly";

export type DuesNotification =
    | "Yes - Every 7 days"
    | "Yes - 3 days before deadline"
    | "No - Manual reminders only";

export type DuesCurrency = "USD" | "NGN" | "EUR" | "GBP";

export type DuesLocation =
    | "Nigeria"
    | "Diaspora"
    | "Branch Only"
    | "Both Diaspora and Nigeria branches";

export interface CreateBranchDuesPayload {
    title: string;
    currency: DuesCurrency | string;
    amount: string;
    startDate: string;
    endDate: string;
    interval: DuesInterval | string;
    notifications: (DuesNotification | string)[];
    ageGrades: string[];
    location: DuesLocation | string;
    gender: string;
    memberRoles: string[];
}

export interface CreateBranchDuesResponse {
    message: string;
}
