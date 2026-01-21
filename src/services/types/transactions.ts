export interface TransactionOverview {
    totalCashInflow: number,
    totalApprovedWithdrawals: number,
    netBalance: number,
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

export interface MonthlyWithdrawal {
    month: string;
    totalWithdrawal: number;
}

export interface WithdrawalVisualResponse {
    year: number;
    monthlyWithdrawals: MonthlyWithdrawal[]
}

export interface WithdrawalResponse {
    "Transaction ID": string;
    "Branch Name": string;
    Date: string;
    "Amount Paid": number;
    Status: string;
}


export interface WithdrawalDetailResponse {
    TransactionId: string,
    Branch: string,
    RequestedBy: string,
    Position: string,
    WithdrawalSource: string,
    Amount: number,
    BankName: string,
    AccountNumber: string,
    AccountName: string,
    Date: string,
    PaymentStatus: string,
    withdrawalAgreementForm: File | string | null
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
    Date: string,
    "Due Type": string,
    Intervals: string,
    "Amount Paid": string,
    Status: string
}