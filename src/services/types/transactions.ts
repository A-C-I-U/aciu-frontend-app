import type { Gender, Interval } from "./nationaldues";

export type updateWithdrawalRequestPayload =
 | { status: "APPROVED" }
 | {
    status: "REJECTED",
    reason: string
}

export interface TransactionStat {
    amount: number,
    growth: number
}

export interface TransactionOverview {
    totalCashInflow: TransactionStat,
    totalApprovedWithdrawals: TransactionStat,
    netBalance: TransactionStat,
    transactionsThisMonth: number,
}

export interface MonthlyDuesPayment {
    month: string;
    totalPayment: number
}

export interface DuesPaymentVisualsResponse {
    year: number;
    monthlyPayments: MonthlyDuesPayment[]
}

export interface MonthlyDonations {
    month: string;
    totalDonation: number;
}

export interface DonationVisualsResponse {
    year: number;
    monthlyDonations: MonthlyDonations[]
}

export interface MonthlyDuesStatus {
    month: string;
    paid: number;
    overdue: number;
}

export interface DuesStatusResponse {
    year: number;
    monthlyData: MonthlyDuesStatus[]
}

export interface DuesStatusApiResponse<DuesStatusResponse> {
    success: boolean,
    message: string,
    data: DuesStatusResponse
}

export interface MonthlyWithdrawal {
    month: string;
    totalWithdrawal: number;
}

export interface WithdrawalVisualResponse {
    year: number;
    monthlyWithdrawals: MonthlyWithdrawal[]
}

export interface WithdrawalResponse {
    id: string;
    transactionId: string;
    "Branch Name": string;
    Date: string;
    "Amount Paid": number;
    Status: "pending" | "approved" | "rejected";
}


export interface WithdrawalAPIResponse {
    TransactionId: string;
    Branch: string;
    RequestedBy: string;
    Position: string;
    WithdrawalSource: string;
    Amount: number;
    BankName: string;
    AccountName: string;
    AccountNumber: string;
    Date: string;
    PaymentStatus: "pending" | "rejected" | "approved";
    withdrawalAgreementForm: string;
}

export interface WithdrawalDetailResponse {
    transactionId: string;
    branch: string;
    requestedBy: string;
    position: string;
    withdrawalSource: string;
    amount: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    date: string;
    status: "pending" | "rejected" | "approved";
    withdrawalAgreementForm: string;
}

export interface DonationsResponse {
    id: string,
    transactionId: string,
    "Donor Name": string,
    Date: string,
    "Amount Paid": number,
    Status: "completed" | "failed" | "unpaid" | "cancelled" | "overdue"
}

export interface DuesPaymentResponse {
    id: string,
    transactionId: string,
    paidBy: string,
    date: string,
    amountPaid: number,
    status: "completed" | "failed" | "unpaid" | "cancelled" | "overdue"
}


export interface DuesPaymentDetail {
    transactionId: string,
    paidBy: string,
    payerBranch: string,
    duesTitle: string,
    amount: number,
    source: string,
    datePaid: string,
    paymentStatus: string
}

export interface EventDonationDetails {
    transactionId: string,
    eventName: string | null,
    eventCategory: string | null,
    donorName: string,
    donorBranch: string,
    source: string,
    date: string,
    amount: number,
    status: string
}

export interface ProjectDonationDetails {
    transactionId: string,
    "Project Name": string,
    "Donor Name": string,
    "Donor Branch": string,
    Source: string,
    Date: string,
    Amount: number,
    Status: string
}

export interface NationalDuesResponse {
    id: string,
    Date: string,
    "Due Type": string,
    Intervals: string,
    "Amount Paid": string,
    Status: "active" | "inactive"
}

export interface NationalDuesDetail {
    id: string;
    branchId: string;
    title: string;
    createdBy: string;
    createdOn: string;
    currency: "USD";
    amount: string;
    amountUsd: number;
    amountNaira: number;
    startDate: string;
    endDate: string;
    interval: Interval;
    ageGrades: string[];
    gender: Gender;
    location: string;
    memberRoles: string[];
    notifications: string[];
    status: "Active" | "Inactive";
    createdAt: string;
    updatedAt: string
    User: {
        id: string;
        fullName: string;
        email: string;
    };
}